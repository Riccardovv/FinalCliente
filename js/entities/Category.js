class Category{
  #title;
  #description;

  constructor(title, description){

    if (title=="") throw new InvalidValue("title", title);
    if (description=="") throw new InvalidValue("description", description);
    this.#title=title;
    this.#description=description;

  }

  // gets and sets for title

  get title() {
    return this.#title;
  }

  set title(title) {
    if(title=="") throw new InvalidValue("title", "empty")
    this.#title = title;
  }

  // gets and sets for description

  get description() {
    return this.#description;
  }

  set description(description) {
    if(description=="") throw new InvalidValue("description", "empty")
    this.#description = description;
  }

}


// export default Category;