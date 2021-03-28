import { useState, useEffect, Fragment } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { getCookie } from '../../actions/auth';
import { create, getTags, removeTag } from '../../actions/tag';
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Spinner,
  Badge,
} from 'reactstrap';

const Tag = () => {
  const [values, setValues] = useState({
    name: '',
    error: false,
    success: false,
    tags: [],
    removed: false,
    reload: false,
    color: 'Primary',
  });

  const { name, error, success, tags, removed, reload, color } = values;
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
    loadTags();
  }, [reload]);

  const loadTags = () => {
    getTags().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setValues({ ...values, tags: data });
      }
    });
  };

  const showTags = () => {
    return tags.map((t) => {
      return (
        <Badge
          onDoubleClick={() => deleteConfirm(t.slug)}
          title="Double click to delete"
          key={t._id}
          className="mr-1 ml-1 mt-3 p-2"
          color={t.color.toLowerCase()}
          style={{ cursor: 'pointer' }}
          pill
        >
          {t.name}
        </Badge>
      );
    });
  };

  const deleteConfirm = (slug) => {
    let answer = window.confirm('Are you sure you want to delete this tag?');
    if (answer) {
      deleteTag(slug);
    }
  };

  const deleteTag = (slug) => {
    // console.log('delete', slug);
    removeTag(slug, token).then((data) => {
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
      return <p className="text-success">Tag is created</p>;
    }
  };

  const showError = () => {
    if (error) {
      return <p className="text-danger">Tag already exist</p>;
    }
  };

  const showRemoved = () => {
    if (removed) {
      return <p className="text-danger">Tag is removed</p>;
    }
  };

  const mouseMoveHandler = (e) => {
    setValues({ ...values, error: false, success: false, removed: '' });
  };

  const newTagForm = () => (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label for="name">Name</Label>
        <Input
          onChange={handleChange}
          value={name}
          type="text"
          name="name"
          id="name"
          placeholder="Type new tag"
        />
      </FormGroup>
      <FormGroup>
        <Label className="mr-2">Color</Label>
        <Badge style={{ cursor: 'pointer' }} color={values.color.toLowerCase()} pill>
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
              pill
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
        {newTagForm()}
        {showTags()}
      </div>
    </Fragment>
  );
};

export default Tag;
