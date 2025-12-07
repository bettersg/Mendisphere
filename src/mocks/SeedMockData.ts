import * as admin from 'firebase-admin';
import { Collections, StorageDirectory } from '../services/Firebase/names';
import { faker } from '@faker-js/faker';
import fetch from 'node-fetch';
import { mockConsultants } from './definitions/MockConsultants';
import { mockOrganisations } from './definitions/MockOrganisations';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Load environment variables from .env.development.local
dotenv.config({ path: path.resolve(__dirname, '../../.env.development.local') });

// Set faker seed for predictable data generation
const FAKER_SEED = 777;
faker.seed(FAKER_SEED);

// Connect to emulator
process.env.FIRESTORE_EMULATOR_HOST = 'localhost:9999';
process.env.FIREBASE_STORAGE_EMULATOR_HOST = 'localhost:9199';

const projectId = process.env.REACT_APP_MINDBETTER_PROJECT_ID || 'demo-mendisphere';
const storageBucket = process.env.REACT_APP_MINDBETTER_STORAGE_BUCKET || 'demo-mendisphere.appspot.com';

admin.initializeApp({ 
  projectId,
  storageBucket
});
const db = admin.firestore();
const storage = admin.storage().bucket();

async function downloadImageAndAddToFirebaseStorage(
  imageUrl: string,
  storageDir: string
): Promise<string> {
  try {
    // Download placeholder image
    const response = await fetch(imageUrl);
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload to firebase storage
    const fileName = `${faker.string.uuid()}.jpg`;
    const filePath = `${storageDir}/${fileName}`;
    const file = storage.file(filePath);
    
    await file.save(buffer, {
      contentType: 'image/jpeg',
      metadata: {
        firebaseStorageDownloadTokens: faker.string.uuid(),
      },
    });

    // Return the storage path
    return `gs://${storage.name}/${filePath}`;
  } catch (error) {
    console.warn(`Failed to upload image from ${imageUrl}:`, error);
    return imageUrl; // Return original URL as fallback
  }
}

async function uploadOrgData(): Promise<void> {
  console.log('📦 Uploading organization data...');
  
  for (const element of mockOrganisations) {
    const orgData = element.org;
    const orgName = orgData.name ?? 'unknown';
    const orgId = `mock_${orgName.replace(/\s|\(|\)/g, '')}`;

    try {
      // Upload organisation doc
      await db.collection(Collections.organisations).doc(orgId).set(orgData);
      console.log(`  ✓ ${orgId} organisation added`);

      // Upload organisation summary doc
      const summaryRef = db
        .collection(Collections.organisations)
        .doc(orgId)
        .collection(Collections.organisationSummary)
        .doc('summary');
      await summaryRef.set(element.summary);
      console.log(`  ✓ ${orgId} summary added`);

      // Download and upload our story images
      const ourStoryData = [...element.ourStory];
      for (const osData of ourStoryData) {
        osData.imageUrl = await downloadImageAndAddToFirebaseStorage(
          osData.imageUrl,
          StorageDirectory.profilesOurStoryDirectory.replace(/:orgId/g, orgId)
        );
      }

      // Upload our story doc
      const ourStoryRef = db
        .collection(Collections.organisations)
        .doc(orgId)
        .collection(Collections.organisationOurStory)
        .doc('ourStory');
      await ourStoryRef.set({ content: ourStoryData });
      console.log(`  ✓ ${orgId} our story added`);

      // Download and upload people spotlight images
      const peopleSpotlightData = [...element.peopleSpotlight];
      for (const psData of peopleSpotlightData) {
        psData.photoUrl = await downloadImageAndAddToFirebaseStorage(
          psData.photoUrl,
          StorageDirectory.profilesPeopleSpotlightDirectory.replace(/:orgId/g, orgId)
        );
      }

      // Upload people spotlight doc
      const peopleSpotlightRef = db
        .collection(Collections.organisations)
        .doc(orgId)
        .collection(Collections.organisationPeopleSpotlight)
        .doc('peopleSpotlight');
      await peopleSpotlightRef.set({ content: peopleSpotlightData });
      console.log(`  ✓ ${orgId} people spotlight added`);
    } catch (error) {
      console.error(`  ✗ Error uploading ${orgId}:`, error);
    }
  }
}

async function uploadConsultantData(): Promise<void> {
  console.log('👥 Uploading consultant data...');
  
  for (const consultant of mockConsultants) {
    const docId = `mock_${consultant.name?.replace(/\s/g, '')}`;
    
    try {
      // Download and upload profile image if exists
      if (consultant.profileImageUrl) {
        consultant.profileImageUrl = await downloadImageAndAddToFirebaseStorage(
          consultant.profileImageUrl,
          StorageDirectory.consultantProfileImagesDirectory.replace(/:consultantId/g, docId)
        );
        console.log(`  ✓ Uploaded photo for ${consultant.name}`);
      }

      await db.collection(Collections.consultants).doc(docId).set(consultant);
      console.log(`  ✓ ${docId} consultant added`);
    } catch (error) {
      console.error(`  ✗ Error uploading ${docId}:`, error);
    }
  }
}

async function clearAllData(): Promise<void> {
  console.log('🗑️  Clearing existing data...');
  
  try {
    // Clear organizations and their subcollections
    const orgsSnapshot = await db.collection(Collections.organisations).get();
    const deletePromises: Promise<any>[] = [];
    
    for (const orgDoc of orgsSnapshot.docs) {
      // Delete subcollections
      const summarySnapshot = await orgDoc.ref.collection(Collections.organisationSummary).get();
      summarySnapshot.docs.forEach(doc => deletePromises.push(doc.ref.delete()));
      
      const ourStorySnapshot = await orgDoc.ref.collection(Collections.organisationOurStory).get();
      ourStorySnapshot.docs.forEach(doc => deletePromises.push(doc.ref.delete()));
      
      const peopleSpotlightSnapshot = await orgDoc.ref.collection(Collections.organisationPeopleSpotlight).get();
      peopleSpotlightSnapshot.docs.forEach(doc => deletePromises.push(doc.ref.delete()));
      
      // Delete main doc
      deletePromises.push(orgDoc.ref.delete());
    }
    
    // Clear consultants
    const consultantsSnapshot = await db.collection(Collections.consultants).get();
    consultantsSnapshot.docs.forEach(doc => deletePromises.push(doc.ref.delete()));
    
    await Promise.all(deletePromises);
    console.log('  ✓ All data cleared');
    console.log('');
  } catch (error) {
    console.error('  ✗ Error clearing data:', error);
    throw error;
  }
}

async function seedData(force: boolean = false): Promise<void> {
  console.log('🌱 Seeding emulator with mock data...');
  console.log('');
  
  try {
    // Check if data already exists
    const orgsSnapshot = await db.collection(Collections.organisations).limit(1).get();
    if (!orgsSnapshot.empty) {
      if (force) {
        console.log('⚠️  Data exists but --force flag detected');
        await clearAllData();
      } else {
        console.log('✅ Data already exists. Skipping seed.');
        console.log('💡 Use --force flag to clear and reseed data');
        process.exit(0);
      }
    }

    // Seed organizations with full structure
    await uploadOrgData();
    console.log('');

    // Seed consultants
    await uploadConsultantData();
    console.log('');

    console.log('✅ Seeding complete!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
}

// Check for --force flag and optional --seed flag
const forceFlag = process.argv.includes('--force');
const seedIndex = process.argv.findIndex(arg => arg === '--seed');
const customSeed = seedIndex !== -1 && process.argv[seedIndex + 1] 
  ? parseInt(process.argv[seedIndex + 1], 10) 
  : FAKER_SEED;

// Apply custom seed if provided
if (seedIndex !== -1) {
  faker.seed(customSeed);
  console.log(`🎲 Using custom faker seed: ${customSeed}`);
}

// Run seeding
seedData(forceFlag);