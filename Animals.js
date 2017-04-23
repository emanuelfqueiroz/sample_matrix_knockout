/* 
 * @param AnimalType animalType
 * @returns {undefined}
 */
function Animal(animalType)
{
    var self = this;
    /**
     * @var {AnimalType} animalType
     */
    self.animalType = animalType;
    self.text = function ()
    {
        return self.animalType.typeName.FirstLetter();
    }
    self.is_a = function (animalType)
    {
        return self.animalType.isEqual(animalType);
    }
}
    
Animal.createInstance = function (typeName)
{
    var typeAnimal = new AnimalType(typeName);
    return new Animal(typeAnimal);
}


function AnimalType(_type) {
    var self = this;
    self.typeName = _type;
    self.text = function ()
    {
        return self.typeName;
    }
    /**
     * @param AnimalType animalType
     * @returns {undefined}
     */
    self.isEqual = function (animalType)
    {
        /* var animalType AnimalType */
        if (animalType instanceof AnimalType)
        {
            self.typeName == animalType.typeName
        }
        return self.typeName == animalType;
    };


}

AnimalType.bear = 'bear';
AnimalType.fish = 'fish';



