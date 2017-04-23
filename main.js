String.prototype.FirstLetter = function () {
    return this.charAt(0).toUpperCase();
}
function text(a)
{
    return a.text();
}
function printxt(a)
{
    print(text(a));
}
function print(a)
{
    console.log(stringfy(a));
}
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
function stringfy(a)
{

    return JSON.stringify(JSON.decycle(a));
}
/**
 * 
 * @param {Environment} a
 * @returns {Environment}
 */
function testRef(a)
{
    a.width = 1000;
}
var env = new Environment(10, 10);

/**
 * 
 * @param {Environment} env
 * @returns {undefined}
 */
function ViewModel(env)
{
    var self = this;
    self.environment = env;
    self.historic = ko.observableArray([]);
    self.iteration = ko.observable(new iteration(env));

    self.addAnimals = function ()
    {
        self.environment.createAnimals(AnimalType.bear);
        self.environment.createAnimals(AnimalType.fish);
        self.addHistoric(self.environment);
    }
    self.restart = function ()
    {
        var cells = self.environment.getCells();
        for (var index in cells) {
            cells[index].removeItem();
        }
        self.addHistoric(self.environment);
    }

    self.addHistoric = function(environment)
    {
        var h = jQuery.extend(true, {}, environment);
        //
        if (self.historic().length > 3)
        {
            self.historic.remove(self.historic()[0]);
        }
        self.historic.push(h);
    }
    self.iteration = new iteration(self.environment);
    self.nextIteration = function ()
    {
        self.iteration.nextIteration();
        self.addHistoric(self.iteration.environtment);
    }


}

/**
 * 
 * @param {Environment} environment
 * @returns {undefined}
 */
function iteration(environment)
{
    var self = this;
    
    self.environtment = environment;
    self.lastCellChecked = null;
    self.cells = [];
    self.nextIteration = function()
    {
        self.clearCells();
        if(self.cells.length == 0)
        {
            self.cells = self.environtment.getFilledCells();
        }
        var cell = self.cells.pop();
        self.realizeMoviment(cell);
    }
    self.clearCells = function()
    {
        var cells = self.environtment.getCells();
        for (var index in cells) {
            cells[index].status = "";
        }
    }
    /**
     * 
     * @param {Cell} cell
     * @returns {undefined}
     */
    self.realizeMoviment = function(cell)
    {
        var i = new AnimalMoviment(cell);
        var newcell = i.nextCellAllowed();
        if(newcell != null)
        {
            var i1 = cell.item;
            var i2 = newcell.item;
            
            cell.removeItem();
            newcell.removeItem();
            newcell.addItem(i1);
            if(i2 != null)
            {
                newcell.status = "replaced";
            }
        }
        else
        {
            cell.status = "noMoviment";
        }
        
    }
    
}

var appModel = new ViewModel(env);
appModel.addAnimals();
ko.applyBindings(appModel);




//$('#main').html(stringfy(a));
//$('#main').html(a.width);


