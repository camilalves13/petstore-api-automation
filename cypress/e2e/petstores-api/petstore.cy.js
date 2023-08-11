const PetCounter = require('./PetCounter');

describe('Petstore API Tests', () => {
    
    it('Create new Pet and retrieve its data', () => {

      const idUnique = Date.now().toString(); // Unique ID by pet created

      const body = {
        id: idUnique,
        category: {
          id: 0,
          name: 'Cris1008'
        },
        name: 'Doggie Name '+idUnique,
        photoUrls: ['photo_url'],
        tags: [
          {
            id: 0,
            name: 'TAG TEST'
          }
        ],
        status: 'available'
      };

      cy.request('POST', '/pet',body).then(response => {

        // Check the status if equal 200 , everything OK
        expect(response.status).to.equal(200);
  
        const userId = response.body.id;

        cy.request(`https://petstore.swagger.io/v2/pet/${userId}`).then(response => {
          expect(response.status).to.equal(200);
          expect(response.body.name).to.equal('Doggie Name '+idUnique);
          expect(response.body.status).to.equal('available');
        });
      });
    });

    it('Get all pets by status SOLD', () => {
      
      const status = {
        value: 'sold'
      };
      
      cy.request('GET', '/pet/findByStatus?status='+status.value).then(response => {
        
        // Check if the GET request was successful
        expect(response.status).to.equal(200);

        // Map the response to { id, name } 
        const formattedResponse = response.body.map(pet => {
          return {
            id: pet.id,
            name: pet.name
          };
        });

        // Check if the formattedResponse only have id and name as structure
        formattedResponse.forEach(pet => {
          expect(pet).to.have.all.keys('id', 'name');
          expect(Object.keys(pet).length).to.equal(2);
        });

        const petCounter = new PetCounter(formattedResponse).countPetNames();

        // Print log on cypress console
        cy.log(JSON.stringify(petCounter, null, 2));

      });
    });
  });
  