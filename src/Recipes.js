export default class Recipes {

    /**
     * @returns {string[]}
     */
    static get ingredients() {
        return ['banana', 'bread', 'chicken', 'chocolate', 'egg', 'fish', 'milk', 'porridge', 'rice', 'sauce', 'spider', 'sugar'];
    }

    static get food () {
        return ["Chicken Cotton Candy", "Fish  Milkshake", 'Chocolate Risotto', 'Cow eyes porridge', 'Banana Hotdog', 'Spider Sponge Cake']
    }

    /**
     * @returns {{Soup: *[], "Spaghetti Bolognese": *[]}}
     */
    static get recipes() {

        return {
            "Chicken Cotton Candy": [Recipes.ingredients[2], Recipes.ingredients[10], Recipes.ingredients[12]],
            "Fish  Milkshake": [Recipes.ingredients[5], Recipes.ingredients[6], Recipes.ingredients[7]],
            "Chocolate Risotto": [Recipes.ingredients[3], Recipes.ingredients[9]],
            "Cow eyes porridge": [Recipes.ingredients[8], Recipes.ingredients[5]],
            "Banana Hotdog": [Recipes.ingredients[1], Recipes.ingredients[0]],
            "Spider Sponge Cake": [Recipes.ingredients[11], Recipes.ingredients[10], Recipes.ingredients[4]]
        }
    }


    // banana 0
    // bread 1
    // chicken 2
    // chocolate 3
    // egg 4
    // eye 5
    // fish 6
    // milk 7
    // porridge 8
    // rice 9
    // sauce 10
    // spider 11
    // sugar 12
}