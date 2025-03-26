

export default function IngList(props){
    return(
    <div className="list_section">
        <h2 className="listHeader">Ingredients on hand:</h2>
        <ul className="ingredientList">{props.NewIngredientList}</ul>
    </div>
    )
}

