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

        /**
         * @type Boolean
         */
        this.tableJustFinished = false;

        this.reviewData = {
            tablesCompleted: 0,
            tablesFailed: 0,
        };

        //TODO: Just for testing, need to add logic here.
        setInterval(() => this.newTable(), 10000);
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

        // Excellent coding standards
        for(let i of [1, 0, 2]){
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
        this.tableJustFinished = true;
        this.reviewData.tablesCompleted++;
    }

    setTableFailed(tableNumber){
        this.tables.get(tableNumber).destroy();
        this.tables.delete(tableNumber);
        this.reviewData.tablesFailed++;
    }

    generateReview() {
        const c = this.reviewData.tablesCompleted;
        const f = this.reviewData.tablesFailed;

        const stars = (c === 0) ? 0
            : (f === 0) ? 5
            : Math.floor((c / (c + f)) * 10) / 2;

            return ({
                stars,
                c,
                f,
            });
    }

    getAllTables () {
        return this.tables;
    }

    get hasJustFinishedTable() {
        return this.tableJustFinished;
    }

    set hasJustFinishedTable(val) {
        this.tableJustFinished = val;
    }

    static getInstance(app) {
        if (!_instance && app) {
            _instance = new RestaurantManager(SINGLETON_ENFORCER, app);
        }

        return _instance;
    }

}