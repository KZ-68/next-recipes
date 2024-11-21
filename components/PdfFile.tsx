import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#E4E4E4',
    marginHorizontal: '1mm',
    marginVertical: '2mm'
  },
  section_1: {
    flexDirection: 'column',
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  section_1_line_2: {
    flexDirection: 'row'
  },
  section_2: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10
  },
  section_2_aside_left: {
    flexDirection: 'column'
  },
  section_2_aside_right: {
    flexDirection: 'column'
  },
  tabs_block: {
    flexDirection: 'column'
  },
  tabs: {
    flexDirection: 'row',
  },
  ingredients_or_tools_list: {
    flexDirection: 'row',
  },
  ingredients_or_tools_block: {
    flexDirection: 'column',
  },
  section_3: {
    flexDirection: 'row'
  },
  section_3_block: {
    flexDirection: 'column'
  }
});

interface PdfFileProps {
  recipe: RecipeType;
}

// Create Document Component
const PdfFile:React.FC<PdfFileProps> = ({recipe}) => {

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section_1}>
          <Text>{recipe.title}</Text>
          <View style={styles.section_1_line_2}>
            <Text>{recipe.category.name}</Text>
            <Text>{recipe.duration}</Text>
          </View>
        </View>
        <View style={styles.section_2}>
          <View style={styles.section_2_aside_left}>
            <Text>Instructions</Text>
            <Text>{recipe.instruction}</Text>
          </View>
          <View style={styles.section_2_aside_left}>
            <Text>Ingredients and Tools</Text>
            <View style={styles.tabs_block}>
              <View style={styles.tabs}>
                <Text>Ingredients</Text>
                <Text>Tools</Text>
              </View>
            </View>
            <View style={styles.ingredients_or_tools_list}>
              {recipe?.ingredients && recipe.ingredients.length > 0 ? (
                recipe?.ingredients.map(
                    (ingredient: IngredientRecipeType) => (
                        <View style={styles.ingredients_or_tools_block} key={ingredient.id}>
                          <Text>{ingredient.ingredient.name}</Text>
                          <Text>{ingredient.quantity} {ingredient.unit}</Text>
                        </View>
                    )
                )
                ) : 
                (
                  <Text>Aucun ingrédient à été ajouté sur cette recette.</Text>
                )
              }
            </View>
          </View>
        </View>
        <View style={styles.section_3}>
          <Text>Steps ({recipe?.steps.length})</Text>
          {recipe?.steps && recipe.steps.length > 0 ? (
                recipe?.steps.map(
                    (step: StepType) => (
                      <View style={styles.section_3_block} key={step.id}>
                        <Text>{step.order}</Text>
                        <Text>{step.text}</Text>
                      </View>
                    )
                )
            ) : 
            (
              <View>
                  <Text>No step can be found for this recipe</Text>
              </View>
            )
          }
        </View>
      </Page>
    </Document>
  )
  
};

export default PdfFile