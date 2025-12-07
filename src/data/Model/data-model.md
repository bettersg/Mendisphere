# Data Model

The application uses Firebase Firestore with the following data structure:

```mermaid
erDiagram
    User ||--o| Organisation : "belongs to"
    Organisation ||--o| OrganisationSummary : "has"
    Organisation ||--o| OrganisationAdminData : "has"
    Organisation ||--o{ OrganisationProfileOurStory : "has"
    Organisation ||--o{ OrganisationProfilePeopleSpotlight : "has"
    Organisation ||--o{ OrganisationProfileFAQ : "has"
    Organisation ||--o{ OrganisationProfileImpact : "has"
    
    User {
        string id PK
        string role
        string orgRef FK
    }
    
    Organisation {
        string id PK
        string name
        string ipcApproved
        string verified
        string mainSpecialisation
        string mainSupportArea
        array services
        string description
        string cardImageUrl
    }
    
    OrganisationSummary {
        string orgId PK,FK
        string videoUrl
        string websiteUrl
        string donationUrl
        string mission
        string email
        array socials
    }
    
    OrganisationAdminData {
        string orgId PK,FK
        string address
        string size
        string capitalCurrent
        string capitalGoal
        date lastFundingDate
        date ipcExpiry
        string uen
    }
    
    OrganisationProfileOurStory {
        string orgId PK,FK
        array content
    }
    
    OrganisationProfilePeopleSpotlight {
        string orgId PK,FK
        array content
    }
    
    OrganisationProfileFAQ {
        string orgId PK,FK
        array FAQ
    }
    
    OrganisationProfileImpact {
        string orgId PK,FK
        array content
    }
    
    Consultant {
        string id PK
        string name
        string email
        string phone
        array services
        string profileImageUrl
    }
```

## Relationships

- **User** → **Organisation**: Each user belongs to one organisation via `orgRef`
- **Organisation** → **OrganisationSummary**: One-to-one relationship for contact and social information
- **Organisation** → **OrganisationAdminData**: One-to-one relationship for administrative data
- **Organisation** → **Profile Collections**: One-to-many relationships with:
  - **OrganisationProfileOurStory**: Organisation's story content
  - **OrganisationProfilePeopleSpotlight**: Featured people
  - **OrganisationProfileFAQ**: Frequently asked questions
  - **OrganisationProfileImpact**: Impact stories
- **Consultant**: Independent entity (no direct relationship to Organisation)

## Firestore Collections

### Main Collections
- `organisations` - Core organisation data
- `users` - User role data
- `consultants` - Consultant profile data

### Organisation Subcollections
Each organisation document has the following subcollections:
- `organisationSummary` - Contact and social information
- `organisationAdminData` - Administrative details
- `organisationOurStory` - Story content
- `organisationPeopleSpotlight` - People features
- `organisationFAQ` - FAQ content
- `organisationImpact` - Impact stories
