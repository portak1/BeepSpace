import React, { useEffect } from 'react';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import ModalUser from '../modalUser';
import RequestHandler from '../../../Handlers/RequestHandler';
import ParameterHandler from '../../../Handlers/ParameterHandler';
import UserController from '../../../Controllers/UserController';

var allUsers = [];
export default function FriendModal(params) {
  const requestHandler = new RequestHandler();
  const userController = new UserController();

  const [users, setUsers] = useState([]);
  const input = React.createRef();
  useEffect(() => {
    requestHandler
      .jSONrequester('User', [new ParameterHandler('type', 'ALL')])
      .then((data) => {
        allUsers = data;
        Promise.all(
          allUsers.map((mapData, id) => {
            return requestHandler
              .jSONrequester('User', [
                new ParameterHandler('type', 'IS-FRIENDS'),
                new ParameterHandler('id', userController.getUser().id),
                new ParameterHandler('id2', mapData.id),
              ])
              .then((state) => {
                if (mapData.name == userController.getUser().username) return;
                return (
                  <ModalUser
                    name={mapData.name}
                    socket={params.socket}
                    friendsState={state.state}
                    userId={mapData.id}
                    key={id}
                  />
                );
              });
          })
        ).then((data) => {
          setUsers(data);
          allUsers = data;
        });
      });
  }, []);

  const search = () => {
    setUsers(
      allUsers.filter((data, id) => {
        if (
          data?.props.name
            .toLowerCase()
            .includes(input.current.value.toLowerCase())
        ) {
          return data;
        }
      })
    );
  };

  const searchOnEnter = (e) => {
    if (e.keyCode === 13) {
      search(e);
    }
  };

  const liveSearch = () => {
    setUsers(
      allUsers.filter((data, id) => {
        if (
          data?.props.name
            .toLowerCase()
            .includes(input.current.value.toLowerCase())
        ) {
          return data;
        }
      })
    );
  };

  return (
    <Modal contentClassName='modalClasses' show={params.state}>
      <Modal.Header>
        <div class='row w-100'>
          <div class='col-8'>
            <h2>přidat přátele</h2>
          </div>
          <div class='col-2'></div>
          <div class='col-1 text-right '>
            <button class='btn modalCloseButton' onClick={params.closeModal}>
              <i class='far fa-times-circle'></i>
            </button>
          </div>
        </div>
      </Modal.Header>
      <Modal.Body>
        <div class='row searchUser w-100 mb-5'>
          <div class='col-8'>
            <input
              type='search'
              class='form-control'
              ref={input}
              onChange={liveSearch}
              onKeyDown={searchOnEnter}
              placeholder='Hledat uživatele'
              aria-label='Search'
            />
          </div>
          <div class='col-4'>
            <button
              type='submit'
              class='form-control '
              onClick={search}
              value=''
              aria-label='Search'
            >
              <i class='fas fa-search'></i>
            </button>
          </div>
        </div>
        <div class='separator'></div>
        {users}
      </Modal.Body>
    </Modal>
  );
}
