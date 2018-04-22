import Table from "./Table";

export default class RestaurantManager {

    constructor(app) {

        /**
         * @type PIXI.Application
         */
        this.app = app;

        /**
         * @type {Map<Number, Table>}
         */
        this.tables = new Map();

        //TODO: Just for testing, need to add logic here.
        setInterval(() => this.newTable(), 5000);
        this.newTable();

    }

    newTable() {

        const tableNumber = this._getFreeTable();
        if(tableNumber === false){
            //WE DON'T HAVE ROOM FOR ANY NEW TABLES 😱
            return false;
        }

        const table = new Table(this.app, tableNumber);
        this.tables.set(tableNumber, table);

    }


    _getFreeTable() {
        const MAX_CUSTOMERS = 3;
        if (this.tables.size >= MAX_CUSTOMERS) {
            return false;
        }

        for(let i = 0; i < MAX_CUSTOMERS; i++){
            if(!this.tables.has(i)){
                return i;
            }
        }
    }

    getCustomerByTable(tableNumber) {
        return this.tables.get(tableNumber);
    }

}