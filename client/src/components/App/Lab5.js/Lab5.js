import * as React from 'react';

const App = () => {

  const recipes = [
    {
      title: 'Fruit salad',
      difficulty: '2',
      ingredients: ['apple', 'banana', 'blueberries', 'raisins', 'walnuts'],
      calories: "200",
      instructions: "Wash fresh fruit. Slice fruit into pieces. Mix all ingredients in a bowl.",
      recipeID: 1,
    }, {
      title: 'Avocado wrap',
      difficulty: '3',
      ingredients: ['avocado', 'spinach', 'pine nuts', 'mayo', 'apple', 'tortilla bread'],
      calories: "400",
      instructions: "Wash all fruits and vegetables. Slice avocadoes and apples. Mix all ingredients and wrap them in a tortilla bread.",
      recipeID: 2
    },
  ];

const [selectedRecipe, setSelectedRecipe] = React.useState('');


  return (
    <div>
      <h1>
        Recipe finder
      </h1>


      <List list={recipes} />

    </div>
  );
}



const List = ({list}) => {
  return (
    <ul>
      {list.map((item) => {
        return (
          <Item item={item} />
        );
      })}
    </ul>

  )
}

const Item = ({item}) => {
  return (
    <li>
      <p> {"Title: " + item.title}</p>
      <p> {"Difficulty: " + item.difficulty}</p>
      <p>Ingredients: </p>
      <ul>
        {item.ingredients.map((ingredient) => (<li>{ingredient}</li>))}
      </ul>
      <p>{"Instructions: " + item.instructions}</p>
      <p>{"Calories: " + item.calories}</p>
    </li>
  )
}


export default App;