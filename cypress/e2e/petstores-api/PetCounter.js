class PetCounter {
    constructor(petsData) {
      this.petsData = petsData;
    }
  
    countPetNames() {
      const petNameCount = {};
      
      this.petsData.forEach(pet => {
        const petName = pet.name;
        if (petNameCount[petName]) {
          petNameCount[petName]++;
        } else {
          petNameCount[petName] = 1;
        }
      });
      
      return petNameCount;
    }
  }

  module.exports = PetCounter;