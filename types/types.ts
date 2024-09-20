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
    userId: string;
    createdAt: Date;
}
 
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
}

interface IngredientType {
    id: string;
    name: string;
    image_url: string;
}

interface IngredientRecipeType {
    id: string;
    quantity: number;
    unit: string;
    ingredient: IngredientType;
}

interface ToolType {
    id: string;
    name: string;
    image_url: string;
}

interface ToolRecipeType {
    id: string;
    ingredient: ToolType;
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
    createdAt: Date;
    category: CategoryType;
    ingredients: IngredientRecipeType[];
    tools: ToolRecipeType[];
    comments: CommentType[];
    steps: StepType[];
}