import React, { useState } from 'react';

const Product = ({price, name, onShowProduct, onCalcTotal}) => {
  // Declare a new state variable called "quantity"
  const [quantity, setQuantity] = useState(0);

  const buy = () => {
    // alert("yo nigga");
    setQuantity(quantity + 1);
    onCalcTotal(price);
  }

  return (
    <>
      <h3>{name}</h3>
      <p>Price: ${price}</p>
      <button onClick={buy}>Buy</button>
      <button onClick={() => onShowProduct(name)}>Show</button>
      <h4>Quantity: {quantity}</h4>
      <hr/>
    </>
  )
}

const Total = ({totalCash}) => {
  return (
    <h3>Total Cash: {totalCash}</h3>
  )
}

const ProductForm = ({ index, onCreateProduct }) => {

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const createProduct = (e) => {
    e.preventDefault();
    // alert("Name: " + name + " , Price: "+ price);
    if (name != undefined && price > 0) {
      //const price = parseInt(price, 10);
      const product = {
        id: index,
        name,
        price: parseInt(price)
      };
      onCreateProduct(product);
    }

    // Reset form.
    setName("");
    setPrice("");
  }

  return (
    <form>
      <label>Product Name </label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <br/><br/>
      <label>Product Price </label>
      <input
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <br/><br/>

      <button onClick={createProduct}>Create</button><br/><br/>
      <hr/>
    </form>
  )
}

const ProductList = () => {
  const [total, setTotal] = useState(0);

  const [products, setProducts] = useState([
    {id: 1, name: "Samsung", price: 100},
    {id: 2, name: "Apple", price: 200},
    {id: 3, name: "Motorola", price: 80},
  ]);

  const calcTotal = (price) => {
    setTotal(total + parseInt(price));
  }

  const ProductName = (name) => {
    alert("You have selected " + name)
  }

  const addProduct = (product) => {
    // [1,2,3]
    // setProducts([...products, 4]) => [1,2,3,4]
    for (let k in products) {
      if (products[k].name.toLowerCase() === product.name.toLowerCase()) {
        alert("The device " + products[k].name + " is already added to the list!");
        return false;
      }
    }
    setProducts([...products, product]);
  }

  return (
    <>
      <ProductForm index={products.length + 1} onCreateProduct={addProduct}/>
      {products.map((p) =>
        <Product
          key={p.id}
          name={p.name}
          price={p.price}
          onCalcTotal={calcTotal}
          onShowProduct={ProductName}
        />
      )}
      <Total totalCash={total}/>
    </>
  )
}

export default ProductList;
