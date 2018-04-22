export default class Recipes {

    /**
     * @returns {string[]}
     */
    static get ingredients() {
        return ['onion', 'tomato', 'carrot', 'celery', 'pasta'];
    }

    /**
     * @returns {{Soup: *[], "Spaghetti Bolognese": *[]}}
     */
    static get recipes() {
        return {
            "Soup": [Recipes.ingredients.onion, Recipes.ingredients.tomato],
            "Spaghetti Bolognese": [Recipes.ingredients.onion, Recipes.ingredients.tomato, Recipes.ingredients.carrot, Recipes.ingredients.pasta]
        }
    }
}