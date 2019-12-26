import React from 'react';

class AddFishForm extends React.Component {
  nameRef = React.createRef();
  priceRef = React.createRef();
  statusRef = React.createRef();
  descRef = React.createRef();
  imageRef = React.createRef();

  createFish = (event) => {
    event.preventDefault();
    const fish = {
      name: this.nameRef.current.value,
      price: parseFloat(this.priceRef.current.value),
      status: this.statusRef.current.value,
      desc: this.descRef.current.value,
      image: this.imageRef.current.value
    }
    this.props.addFish(fish);
    event.currentTarget.reset();
  }
  render() {
    return (
      <form className="fish-edit" onSubmit={this.createFish}>
        <input ref={this.nameRef} type="text" name="name" placeholder="Name" />
        <input ref={this.priceRef} type="text" name="price" placeholder="Price" />
        <select ref={this.statusRef}type="text" name="status">
          <option value="available">Fresh!</option>
          <option value="unavailable">Sold Out!</option>
        </select>
        <textarea ref={this.descRef} type="text" name="desc" placeholder="Desc" />
        <input ref={this.imageRef} type="text" name="image" placeholder="Image" />
        <button type="submit"> + Add Fish</button>
      </form>
    )
  }
}

export default AddFishForm;
