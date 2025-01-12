interface TagType {
    id: string;
    name: string;
}
 
interface TagArticleType {
    id: string;
    tag: TagType;
}
 
interface CommentType {
    id: string;
    text: string;
    createdAt: Date;
    user: string;
}
 
// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface ArticleWithTagsAndComments {
    id: string;
    title: string;
    text: string;
    slug: string;
    createdAt: Date;
    tags: TagArticleType[];
    comments: CommentType[];
}

interface CategoryType {
    id: string;
    name: string;
    recipes: RecipeType[];
}

interface IngredientType {
    id: string;
    name: string;
    image_url: string;
}

interface IngredientRecipeType {
    id: string;
    quantity: string;
    unit: string;
    recipe: RecipeType;
    ingredient: IngredientType;
}

interface ToolType {
    id: string;
    name: string;
    image_url: string;
}

interface ToolRecipeType {
    id: string;
    recipe: RecipeType;
    tool: ToolType;
}

interface StepType {
    id: string;
    text: string;
    order: number;
}
 
interface RecipeType {
    id: string;
    title: string;
    duration: number;
    instruction: string;
    slug: string;
    rating: number;
    image_url: string;
    image_url_cloud: string;
    vegan: boolean;
    healthy: boolean
    createdAt: Date;
    category: CategoryType;
    ingredients: IngredientRecipeType[];
    tools: ToolRecipeType[];
    comments: CommentType[];
    steps: StepType[];
    mealrecipes: MealRecipeType[];
}

interface MenuType {
    id: string;
    date:Date;
    meals: MealType[];
}

interface MealType {
    id: string;
    name:string;
    createdAt:Date;
    menu: MenuType;
    mealrecipes: MealRecipeType[];
}

interface MealRecipeType {
    id: string;
    recipeId: string;
    recipe: RecipeType;
    mealId: string;
}