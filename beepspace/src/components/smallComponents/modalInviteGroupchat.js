import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { useState, useEffect } from 'react';
import ParameterHandler from '../../Handlers/ParameterHandler';
import UserController from '../../Controllers/UserController';
import RequestHandler from '../../Handlers/RequestHandler';
import InviteUser from './InviteUser';

var allUsers = [];

export default function ModalInviteGroupchat(params) {
  const requestHandler = new RequestHandler();
  const userController = new UserController();

  const [users, setUsers] = useState();

  const input = React.createRef();

  useEffect(() => {
    if (params.groupchatID) {
      requestHandler
        .jSONrequester('User', [new ParameterHandler('type', 'ALL')])
        .then((data) => {
          allUsers = data;
          Promise.all(
            allUsers.map((mapData, id) => {
              return requestHandler
                .jSONrequester('Groupchat', [
                  new ParameterHandler('type', 'IN-CHAT'),
                  new ParameterHandler('id', params.groupchatID),
                  new ParameterHandler('user', mapData.name),
                ])
                .then((state) => {
                  if (mapData.name == userController.getUser().username) return;

                  return (
                    <InviteUser
                      name={mapData.name}
                      socket={params.socket}
                      groupState={state}
                      groupchatID={params.groupchatID}
                      userId={mapData.id}
                    />
                  );
                });
            })
          ).then((data) => {
            setUsers(data);
            allUsers = data;
          });
        });
    }
  }, [params.groupchatID]);

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
            <h2>Pozvat přátele do prostoru</h2>
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
