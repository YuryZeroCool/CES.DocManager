import React from 'react';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';

class Headers extends React.Component {
  constructor() {
    super();
    this.addEmployee = this.addEmployee.bind(this);
  }

  addEmployee() {
    this.props.show(true);
  }

  render() {
    return (
      <header>
        <nav>
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              Документы
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1">
                Водители права сроки
              </Dropdown.Item>
              <Dropdown.Item href="#/action-2">
                Водители медсправки сроки
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              Отчеты
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1">Пробег</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Топливо</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Button variant="success" onClick={this.addEmployee}>
            Добавить водителя
          </Button>
          <Button variant="success" onClick={this.addEmployee}>
            Добавить права
          </Button>
        </nav>
      </header>
    );
  }
}
export default Headers;
