/* eslint-disable react/jsx-no-undef */
import React from "react";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import "../../styles/header.scss";
import {VehicleExpenseSheet} from "../Report/VehicleExpenseSheet";


export const Header :React.FC = () =>{
    return (
      <header>
        <div className="wrapper">
          <nav>
            <ul>
              <li>
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
              </li>
              <li>
                <Dropdown>
                  <Dropdown.Toggle variant="success" id="dropdown-basic">
                    Отчеты
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">Пробег</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Топливо</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </li>
              <li>
                <Button variant="success">
                  Добавить водителя
                </Button>
              </li>
              <li>
                <Button variant="success">
                  Добавить права
                </Button>
              </li>
              <li>
                <Button variant="success">Добавить медсправку</Button>
              </li>
            </ul>
          </nav>
        </div>
        <VehicleExpenseSheet></VehicleExpenseSheet>
      </header>
    );
  }
