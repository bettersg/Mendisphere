# Data Model

The application uses Firebase Firestore with the following data structure:

```mermaid
erDiagram
    User ||--o| Organisation : "belongs to"
    User ||--|{ Consultant : "is a"
    Organisation ||--o| OrganisationSummary : "has"
    Organisation ||--o| OrganisationAdminData : "has"
    Organisation ||--o{ OrganisationProfileOurStory : "has"
    Organisation ||--o{ OrganisationProfilePeopleSpotlight : "has"
    Organisation ||--o{ OrganisationProfileFAQ : "has"
    Organisation ||--o{ OrganisationProfileImpact : "has"
    
    User {
        string id PK
        string role
        string type
        string orgID FK
    }
    
    Consultant {
        string id PK
        string name
        string phone
        string shortDescription
        string about
        array services
        string profileImageUrl
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
```

## Relationships

- **User** → **Organisation**: Each user may belong to one organisation via `orgID`
- **Organisation** → **OrganisationSummary**: One-to-one relationship for contact and social information
- **Organisation** → **OrganisationAdminData**: One-to-one relationship for administrative data
- **Organisation** → **Profile Collections**: One-to-many relationships with:
  - **OrganisationProfileOurStory**: Organisation's story content
  - **OrganisationProfilePeopleSpotlight**: Featured people
  - **OrganisationProfileFAQ**: Frequently asked questions
  - **OrganisationProfileImpact**: Impact stories

## User Types

The `users` collection contains different types of users, distinguished by the `type` field:

- **Organisation Users**: Users associated with an organisation (type: `organisationUser`)
  - Have `orgID`, `role`, and `type` fields
  - Linked to an organisation via `orgID`

- **Consultants**: Independent consultant users (type: `consultant`)
  - Have all base user fields plus additional consultant-specific fields:
    - `name`: Consultant's full name
    - `phone`: Contact phone number
    - `shortDescription`: Brief professional summary
    - `about`: Detailed biography
    - `services`: Array of consulting services offered
    - `profileImageUrl`: URL to profile photo stored in Firebase Storage
  - May optionally be associated with an organisation via `orgID`

## Firestore Collections

### Main Collections
- `organisations` - Core organisation data
- `users` - All user data including consultants and organisation users

### Organisation Subcollections
Each organisation document has the following subcollections:
- `organisationSummary` - Contact and social information
- `organisationAdminData` - Administrative details
- `organisationOurStory` - Story content
- `organisationPeopleSpotlight` - People features
- `organisationFAQ` - FAQ content
- `organisationImpact` - Impact stories
