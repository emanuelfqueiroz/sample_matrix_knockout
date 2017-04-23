function Environment(width, height)
{
    var self = this;
    self.width = width;
    self.height = height;
    self.matrix = createMatrix(width, height);

    function createMatrix(width, height) {
        var result = [];
        for (var i = 0; i < width; i++) {
            result[i] = [];
            for (var j = 0; j < height; j++) {
                result[i].push(new Cell(i, j, self));
            }
        }
        return result
    }
    self.createAnimals = function (animaltype)
    {
        var cells = self.getCells().filter(s => s.isEmpty());
        qtdAvailable = cells.length;
        cells = shuffle(cells);
        for (var i = 0; i < cells.length / 10 && qtdAvailable > 0; i++, qtdAvailable) {
            var index = i;
            var cell = cells[index];
            var animal = Animal.createInstance(animaltype);
            cell.addItem(animal); //If Exist item in cell, the animal isnot included
        }
    };
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    self.__cells = null;
    self.getCells = function ()
    {
        if (self.__cells == null)
        {
            var cells = [];
            for (var i = 0; i < width; i++) {

                for (var j = 0; j < height; j++) {


                    cells.push(self.getCell(i, j));
                }

            }
            self.__cells = cells;
        }
        return self.__cells;

    };

    self.getEmptyCells = function ()
    {
        return Cell.getEmptyCells(self.getCells());
    }
    self.getFilledCells = function ()
    {
        return Cell.getFilledCells(self.getCells());
    }
    /**
     * @param {Cell} cell
     * @returns {undefined}
     */
    self.getRegion = function (cell)
    {
        return new Region(cell);
    }

    /**
     * @param {type} row
     * @param {type} col
     * @returns {Cell}
     */
    self.getCell = function (row, col)
    {
        return self.matrix[row][col];
    };

    self.existPosition = function (row, col)
    {
        return row >= 0 && row < self.width
                && col >= 0 && col < self.height;
    };

}
/**
 * 
 * @param {type} row
 * @param {type} col
 * @param {Environment} environment
 * @returns {undefined}
 */
function Cell(row, col, environment)
{
    var self = this;
    self.row = row;
    self.col = col;
    self.environment = environment;
    self.item = null;
    self.status = "";
    self.isValid = function ()
    {
        return environment.existPosition(row, col);
    };
    self.text = function ()
    {
        return self.item ? self.item.text() : " - ";
    }
    self.addItem = function (item)
    {
        if (self.isValid() && self.isEmpty())
        {
            self.item = item;
            self.status = "added";
            return true;
        }
        return false;
    }
    
    self.isEmpty = function ()
    {
        return self.item == null;
    };
    self.removeItem = function ()
    {
        self.status = "removed";
        self.item = null;
    };
}

Cell.getEmptyCells = function (cells)
{
    return cells.filter(s => s.isEmpty());
}
Cell.getFilledCells = function (cells)
{
    return cells.filter(s => !s.isEmpty());
}
/**
 * @param {Cell} cell
 * @param {Direction} direction
 * @returns {undefined}
 */
Cell.getCellFromDirection = function (cell, direction)
{
    var nrow = cell.row + direction.y; //ROW representa o eixo Y
    var ncol = cell.col + direction.x; //COL representa o eixo X
    var env = cell.environment;
    if (env.existPosition(nrow, ncol))
    {
        return env.getCell(nrow, ncol);
    }
    return null;
}
/**
 * 
 * @param {Cell} cell
 * @returns {undefined}
 */
Cell.clone = function (cell)
{
    return new Cell(cell.row, cell.col, cell.environment);
}
/**
 * @param {Cell} cell
 * @returns {undefined}
 */
function AnimalMoviment(cell)
{
    var self = this;
    self.cell = cell;
    self.getAnimalDirections = function ()
    {
        return [
            Direction.UP,
            Direction.LEFT,
            Direction.DOWN,
            Direction.RIGHT,
        ];
    }
    /**
     * 
     * @returns {Animal}
     */
    self.getAnimal = function ()
    {
        return cell.item;
    }
    /**
     * @returns {AnimalType} 
     */
    self.getAnimalType = function()
    {
        return self.getAnimal().animalType;
    }
    self.nextCellAllowed = function()
    {
        var rdDirections = shuffle(self.getAnimalDirections()); //randomDirections rd
        while (rdDirections.length > 0)
        {
            var d = rdDirections.pop();
            newCell = Cell.getCellFromDirection(self.cell, d);
            if (newCell instanceof Cell)
            {
                if(self.canMove(self.cell, newCell))
                {
                    return newCell;
                }
            }
        }
        return null;
    }
    self.canMove = function(cell, newCell)
    {
        if (newCell.isEmpty())
        {
            return true;
        }
        var animal = self.getAnimal(); 
        var animal2 = newCell.item;
        
        var x1 = animal.text();
        var x2 = animal2.text();
        
        var isa1bear = animal.is_a(AnimalType.bear);
        var isa2Fish = animal2.is_a(AnimalType.fish);
        return isa1bear && isa2Fish;
    }
    
}

/**
 * @param {Cell} cell
 * @returns {undefined}
 */
function Region()
{
    var self = this;
}
/**
 * 
 * @param {Cell} cell
 * @param {Direction} directions
 * @returns {Region}
 */
Region.prototype.getRegionFromDirections = function (cell, directions)
{
    var cells = [];
};
function Direction(x, y) {
    var self = this;
    self.x = x;
    self.y = y;
}

Direction.DOWN = new Direction(0, 1);
Direction.UP = new Direction(0, -1);
Direction.LEFT = new Direction(-1, 0);
Direction.RIGHT = new Direction(0, 1);
Direction.LEFTUP = new Direction(-1, -1);
Direction.RIGHTUP = new Direction(1, -1);
Direction.LEFTDOWN = new Direction(-1, 1);
Direction.RIGHTDOWN = new Direction(1, 1);
Direction.ALL = [
    Direction.UP,
    Direction.LEFT,
    Direction.DOWN,
    Direction.RIGHT,
    Direction.LEFTUP,
    Direction.RIGHTUP,
    Direction.LEFTDOWN,
    Direction.RIGHTDOWN,
];

