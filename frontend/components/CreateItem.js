import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import Form from "./styles/Form";
import formatMoney from "../lib/formatMoney";
import Error from "./ErrorMessage";
import Router from "next/router";

const CREATE_ITEM_MUTATION = gql`
  mutation CREATE_ITEM_MUTATION(
    $title: String!
    $description: String!
    $image: String!
    $largeImage: String!
    $price: Int!
  ) {
    createItem(
      title: $title
      description: $description
      image: $image
      largeImage: $largeImage
      price: $price
    ) {
      id
    }
  }
`;

class CreateItem extends Component {
  state = {
    title: "Cool shoes",
    description: "I love those Context",
    image: "",
    largeImage: "",
    price: 100
  };

  handleChange = e => {
    const { name, type, value } = e.target;
    const val = type === "number" ? parseFloat(value) : value;
    this.setState({ [name]: val });
  };

  uploadFile = e => {
    console.log("uploading file ...");
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "sickfits");

    // ** Didn't want to create an account for this service
    // Cloudinary is a image storing cloud service

    // Once an account has been made the following will upload an image.

    // const res= await fetch(
    //     'https://api.cloudinary.com/v1_1/wesbostutorial/image/upload', {
    //         method: 'POST',
    //         body: data
    //     }
    // );

    // const res = res.json();
    // console.log(file);

    // this.setState({
    //     image: file.secure_url,
    //     largeImage: file.eager[0].secure_url
    // })
    console.log(files[0].name);

    this.setState({
      image: files[0].name,
      largeImage: files[0].name
    });
  };

  render() {
    return (
      <Mutation mutation={CREATE_ITEM_MUTATION} variables={this.state}>
        {(createItem, { loading, error }) => (
          <Form
            onSubmit={async e => {
              // stop the form from submitting
              e.preventDefault();

              // call the createItem mutation
              const res = await createItem();

              console.log(res);
              // change them to the single item page
              Router.push({
                pathname: "/item",
                query: { id: res.data.createItem.id }
              });
            }}
          >
            <Error error={error} />
            <fieldset disabled={loading} aria-busy={loading}>
              <label htmlFor="image">
                Image
                <input
                  type="file"
                  id="image"
                  name="image"
                  placeholder="Upload an image"
                  required
                  onChange={this.uploadFile}
                />
                {this.state.image && (
                  <img src={this.state.image} alt="Uploaded image" />
                )}
              </label>
              <label htmlFor="title">
                Title
                <input
                  type="text"
                  id="title"
                  name="title"
                  placeholder="title"
                  required
                  value={this.state.title}
                  onChange={this.handleChange}
                />
              </label>
              <label htmlFor="price">
                Price
                <input
                  type="number"
                  id="price"
                  name="price"
                  placeholder="price"
                  required
                  value={this.state.price}
                  onChange={this.handleChange}
                />
              </label>
              <label htmlFor="description">
                description
                <textarea
                  id="description"
                  name="description"
                  placeholder="description"
                  required
                  value={this.state.description}
                  onChange={this.handleChange}
                />
              </label>
              <button type="submit">Submit</button>
            </fieldset>
          </Form>
        )}
      </Mutation>
    );
  }
}

export default CreateItem;
