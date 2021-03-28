import { useState, useEffect, Fragment } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { getCookie } from '../../actions/auth';
import { create, getCategories, removeCategory } from '../../actions/category';
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Spinner,
  Badge
} from 'reactstrap';

const Category = () => {
  const [values, setValues] = useState({
    name: '',
    error: false,
    success: false,
    categories: [],
    removed: false,
    reload: false,
    color: 'Primary',
  });

  const { name, error, success, categories, removed, reload, color } = values;
  const token = getCookie('token');
  const colors = [
    'Primary',
    'Secondary',
    'Success',
    'Danger',
    'Warning',
    'Info',
    'Light',
    'Dark',
  ];

  useEffect(() => {
    loadCategories();
  }, [reload]);

  const loadCategories = () => {
    getCategories().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setValues({ ...values, categories: data });
      }
    });
  };

  const showCategories = () => {
    return categories.map((c) => {
      return (
        <Badge
          onDoubleClick={() => deleteConfirm(c.slug)}
          title="Double click to delete"
          key={c._id}
          className="mr-1 ml-1 mt-3 p-2"
          color={c.color.toLowerCase()}
          style={{ cursor: 'pointer' }}
        >
          {c.name}
        </Badge>
      );
    });
  };

  const deleteConfirm = (slug) => {
    let answer = window.confirm(
      'Are you sure you want to delete this category?'
    );
    if (answer) {
      deleteCategory(slug);
    }
  };

  const deleteCategory = (slug) => {
    // console.log('delete', slug);
    removeCategory(slug, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setValues({
          ...values,
          error: false,
          success: false,
          name: '',
          removed: !removed,
          reload: !reload,
        });
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log('create category', name);
    create({ name, color }, token).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, success: false });
      } else {
        setValues({
          ...values,
          error: false,
          success: true,
          name: '',
          reload: !reload,
          color: 'Primary'
        });
      }
    });
  };

  const handleChange = (e) => {
    setValues({
      ...values,
      name: e.target.value,
      error: false,
      success: false,
      removed: '',
    });
  };

  const showSuccess = () => {
    if (success) {
      return <p className="text-success">Category is created</p>;
    }
  };

  const showError = () => {
    if (error) {
      return <p className="text-danger">Category already exist</p>;
    }
  };

  const showRemoved = () => {
    if (removed) {
      return <p className="text-danger">Category is removed</p>;
    }
  };

  const mouseMoveHandler = (e) => {
    setValues({ ...values, error: false, success: false, removed: '' });
  };

  const newCategoryForm = () => (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label for="name">Name</Label>
        <Input
          onChange={handleChange}
          value={name}
          type="text"
          name="name"
          id="name"
          placeholder="Type new category"
        />
      </FormGroup>
      <FormGroup>
        <Label className="mr-2">Color</Label>
        <Badge style={{ cursor: 'pointer' }} color={values.color.toLowerCase()}>
          {values.color}
        </Badge>
        <div className="md-12">
          {colors.map((col) => (
            <Badge
              key={col.toLowerCase()}
              style={{ cursor: 'pointer' }}
              color={col.toLowerCase()}
              onClick={() => setValues({ ...values, color: col })}
              className="mr-1 ml-1 mt-3 mb-3"
            >
              {col}
            </Badge>
          ))}
        </div>
      </FormGroup>
      <FormGroup>
        <Button outline color="primary">
          Create
        </Button>
      </FormGroup>
    </Form>
  );

  return (
    <Fragment>
      {showSuccess()}
      {showError()}
      {showRemoved()}
      <div onMouseMove={mouseMoveHandler}>
        {newCategoryForm()}
        {showCategories()}
      </div>
    </Fragment>
  );
};

export default Category;
