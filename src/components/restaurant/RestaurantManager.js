import Table from "./Table";

let _instance = null;
const SINGLETON_ENFORCER = Symbol();

export default class RestaurantManager {

    constructor(enforcer, app) {

        if (enforcer !== SINGLETON_ENFORCER) {
            throw new Error('Singleton innit');
        }

        /**
         * @type PIXI.Application
         */
        this.app = app;

        /**
         * @type {Map<Number, Table>}
         */
        this.tables = new Map();

        //TODO: Just for testing, need to add logic here.
        setInterval(() => this.newTable(), 30000);
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

    /**
     * @param tableNumber
     * @returns {Table}
     */
    getTableByNumber(tableNumber) {
        return this.tables.get(tableNumber);
    }

    setTableComplete(tableNumber) {
        this.tables.get(tableNumber).destroy();
        this.tables.delete(tableNumber);
    }

    getAllTables () {
        return this.tables;
    }

    static getInstance(app) {
        if (!_instance && app) {
            _instance = new RestaurantManager(SINGLETON_ENFORCER, app);
        }

        return _instance;
    }

}