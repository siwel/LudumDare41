export default class Recipes {

    /**
     * @returns {string[]}
     */
    static get ingredients() {
        return ['onion', 'tomato', 'carrot', 'celery', 'pasta', 'Fish'];
    }

    static get food () {
        return ["Soup", "Spaghetti Bolognese", 'Fish']
    }

    /**
     * @returns {{Soup: *[], "Spaghetti Bolognese": *[]}}
     */
    static get recipes() {

        return {
            "Soup": [Recipes.ingredients[0], Recipes.ingredients[1]],
            "Fish": [Recipes.ingredients[0], Recipes.ingredients[5]],
            "Spaghetti Bolognese": [Recipes.ingredients[0], Recipes.ingredients[1], Recipes.ingredients[2], Recipes.ingredients[3]]
        }
    }
}