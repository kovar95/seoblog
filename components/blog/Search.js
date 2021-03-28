import Link from 'next/link';
import { Fragment, useState, useEffect } from 'react';
import {RiSearchEyeLine} from 'react-icons/ri';
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Spinner,
  Badge,
  Container,
  Row,
  Col,
  Alert,
  Jumbotron,
} from 'reactstrap';
import renderHTML from 'react-render-html';
import { listSearch } from '../../actions/blog';
import { API } from '../../config';

const Search = () => {
  const [values, setValues] = useState({
    search: '',
    results: [],
    searched: false,
    message: '',
  });

  const { search, results, searched, message } = values;

  const searchSubmit = (e) => {
    e.preventDefault();
    listSearch({ search }).then((data) => {
      if (data.error) {
        setValues({ ...values, message: data.error });
      } else {
        setValues({
          ...values,
          results: data,
          searched: true,
          message: `${data.length} blogs found`,
        });
      }
    });
  };

  const handleChange = (e) => {
    let { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
      searched: false,
      results: [],
      message: '',
    });
  };

  const searchedBlogs = (results = []) => {
    return (
      <Jumbotron className="p-1 bg-white">
        {message && <p className="pt-1 text-muted font-italic">{message}</p>}

        {results.map((blog, i) => (
          <div key={i}>
            <Link href={`/blogs/${blog.slug}`}>
              <a className="text-primary">{blog.title}</a>
            </Link>
            <hr />
          </div>
        ))}
      </Jumbotron>
    );
  };

  const searchForm = () => (
    <Form onSubmit={searchSubmit}>
      <Row>
        <Col md="12">
          <Input
            onChange={handleChange}
            value={search}
            type="search"
            name="search"
            placeholder="Search blogs!"
          />
        </Col>
        {/* <Col md="2">
          <Button outline color="primary" type="submit">
            Search
          </Button>
          {<RiSearchEyeLine/>}
        </Col> */}
      </Row>
    </Form>
  );

  return (
    <Container
      fluid={true}
      style={{ position: 'relative', paddingLeft: '0px' }}
    >
      <div className="">{searchForm()}</div>
      {searched && (
        <div style={{ position: 'absolute', top: '48px', zIndex: '1' }}>
          {searchedBlogs(results)}
        </div>
      )}
    </Container>
  );
};

export default Search;
