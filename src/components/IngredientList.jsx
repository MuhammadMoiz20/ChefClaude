

export default function  IngList(props){
    return(
    <div className="list_section">
        <h1 className="listHeader">Ingredients on hand:</h1>
         <ul className="ingredientList">{props.NewIngredientList}</ul>
    </div>
    )
}

