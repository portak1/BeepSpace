import SidebarUser from './smallComponents/sidebarUser';
import { useState } from 'react';
import UserController from '../Controllers/UserController';
import RequestHandler from '../Handlers/RequestHandler';
import ParameterHandler from '../Handlers/ParameterHandler';
import SidebarGroupchat from './smallComponents/SidebarGroupchat';
import $ from 'jquery';
import React from 'react';
import { useEffect } from 'react';
import SpaceCall from './SpaceCall';
const userController = new UserController();
const requestHandler = new RequestHandler(
  'http://localhost/Github/BeepSpace/BeepSpaceAPI/beepSpaceAPI/www/'
);
var rendered = false;
var groupChatRendered = false;

var renderUser = {
  username: '',
  rendered: false,
};

function Sidebar(props) {
  const [mute, setMute] = useState(false);

  var proxGroupArray = requestHandler.jSONrequester('Groupchat', [
    new ParameterHandler('type', 'ALL'),
    new ParameterHandler('user', userController.getUser().username),
  ]);
  var proxArray = requestHandler.jSONrequester('User', [
    new ParameterHandler('type', 'ALL'),
  ]);

  useEffect(() => {
    props.socket.on('kick', () => {
      userController.logOut(props.socket);
    })

    props.socket.on('groupchatCreated', (data) => {
      if (data.id == userController.getUser().id) {
        groupChatRendered = !groupChatRendered;
        setGroupchatArray(
          generateGroupChatArray(
            requestHandler.jSONrequester('Groupchat', [
              new ParameterHandler('type', 'ALL'),
              new ParameterHandler('user', userController.getUser().username),
            ])
          )
        );
      }
    });

    props.socket.on('addLocalChannel', (data) => {
      groupChatRendered = !groupChatRendered;
      setGroupchatArray(
        generateGroupChatArray(
          requestHandler.jSONrequester('Groupchat', [
            new ParameterHandler('type', 'ALL'),
            new ParameterHandler('user', userController.getUser().username),
          ])
        )
      );
    });

    props.socket.on('removeFriend', (data) => {
      if (data.reciever == userController.getUser().username)
        removeUser(data.origin);
    });

    props.socket.on('addLocalUser', function (data) {
      if (data.origin == userController.getUser().username) {
        var newUser = requestHandler.jSONrequester('User', [
          new ParameterHandler('type', 'ONE'),
          new ParameterHandler('username', data.reciever),
        ]);
        if (renderUser.username != newUser.name) {
          renderUser.username = newUser.name;
          renderUser.rendered = false;
        }
        if (!renderUser.rendered) {
          setUserArray((userArray) => [
            ...userArray,
            <SidebarUser
              handleInputUser={props.handleInputUser}
              user={userController.getUser().username}
              online={newUser.online}
              socket={props.socket}
              reciever={newUser.name}
            />,
          ]);
          renderUser.rendered = true;
        }
        return;
      } else if (data.reciever == userController.getUser().username) {
        var newUser = requestHandler.jSONrequester('User', [
          new ParameterHandler('type', 'ONE'),
          new ParameterHandler('username', data.origin),
        ]);

        if (renderUser.username != newUser.name) {
          renderUser.username = newUser.name;
          renderUser.rendered = false;
        }
        if (!renderUser.rendered) {
          setUserArray((userArray) => [
            ...userArray,
            <SidebarUser
              handleInputUser={props.handleInputUser}
              user={userController.getUser().username}
              online={newUser.online}
              socket={props.socket}
              activeUser={props.activeUser}
              reciever={newUser.name}
            />,
          ]);
          renderUser.rendered = true;
        }
        return;
      }

      return;
    });
  }, []);

  const removeUser = (user) => {
    setUserArray(
      userArray.filter((item) => {
        if (item != undefined) {
          return item.props.reciever != user;
        }
      })
    );
  };

  const generateArray = (arr) => {
    if (!rendered) {
      rendered = true;
      return arr.map((data, id) => {
        var friendsState = requestHandler.jSONrequester('User', [
          new ParameterHandler('type', 'IS-FRIENDS'),
          new ParameterHandler('id', userController.getUser().id),
          new ParameterHandler('id2', data.id),
        ]);
        if (data.name != userController.getUser().username) {
          if (friendsState.state) {
            return (
              <SidebarUser
                handleInputUser={props.handleInputUser}
                key={id}
                user={userController.getUser().username}
                online={data.online}
                socket={props.socket}
                activeUser={props.activeUser}
                reciever={data.name}
              />
            );
          }
        }
      });
    }
  };

  const generateGroupChatArray = (arr) => {
    if (!groupChatRendered) {
      groupChatRendered = true;
      return arr.map((data, id) => {
        return (
          <SidebarGroupchat
            handleInputUser={props.handleInputUser}
            color={data.color}
            key={id}
            handleInputGroupchat={props.handleInputGroupchat}
            activeUser={props.activeUser}
            socket={props.socket}
            groupchatID={data.id}
            name={data.name}
          />
        );
      });
    }
  };

  const [userArray, setUserArray] = useState(generateArray(proxArray));
  const [groupchatArray, setGroupchatArray] = useState(
    generateGroupChatArray(proxGroupArray)
  );

  const logOut = () => {
    userController.logOut(props.socket);
  };
  const muteFunction = () => {
    if (!mute) {
      props.socket.emit('muteSelf', {
        user: userController.getUser().username,
      });
      setMute(true);
      return;
    }
    props.socket.emit('unmuteSelf', {
      user: userController.getUser().username,
    });
    setMute(false);
  };
  return (
    <aside id='sidebar' class='nano'>
      <div class='nano-content'>
        <div class='row text-center mx-auto'>
          <div class='col crossIconCol'>
            <i class='fas fa-times crossIcon'></i>
          </div>
        </div>
        <div class='row text-center mx-auto'>
          <div class='col mt-3 userBox pb-3 text-center'>
            <h1>{userController.getUser().username}</h1>

            <div class='row'>
              <div class='col'>
                <button class='btn topBoxButton' onClick={props.setModalShow}>
                  <i class='fas fa-search'></i>
                </button>
              </div>
              <div class='col'>
                <button class='btn topBoxButton' onClick={showCallButtons}>
                  <i class='fab fa-connectdevelop'></i>
                </button>
              </div>
              <div class='col'>
                <button onClick={logOut} class='btn topBoxButton'>
                  <i class='fas fa-sign-out-alt'></i>
                </button>
              </div>
            </div>
            <div class='row'>
              <div class='col-12'>
                <button
                  class='btn topBoxButton w-100'
                  onClick={props.setNModalShow}
                >
                  <i class='fas fa-mail-bulk'></i>
                </button>
              </div>
            </div>

            <div id='callButtons' class='row d-none'>
              <div class='col'>
                <button onClick={muteFunction} class='btn topBoxButton'>
                  <i class='fas fa-microphone-slash'></i>
                </button>
              </div>
              <div class='col'>
                <button class='btn topBoxButton'>
                  <i class='fas fa-headphones-alt'></i>
                </button>
              </div>
              <div class='col'>
                <button onClick={logOut} class='btn topBoxButton'>
                  <i class='fas fa-sign-out-alt'></i>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class='row text-center mx-auto'>
          <div class='col mt-3 pb-3 text-center'>
            <SpaceCall
              socket={props.socket}
              user={props.activeUser}
            ></SpaceCall>
          </div>
        </div>
        <menu class='menu-segment'>
          <ul class='chat'>
            <li class='title'>
              Prostory
              <span class='icon'>
                <a onClick={props.setCModalShow} class='addGroup'>
                  +
                </a>
              </span>
            </li>
            {groupchatArray}
          </ul>
        </menu>

        <div class='separator'></div>
        <div class='menu-segment'>
          <ul class='chat'>
            <li class='title'>
              Seznam přátel <span class='icon'></span>
            </li>
            {userArray}
          </ul>
        </div>
        <div class='bottom-padding'></div>
      </div>
    </aside>
  );
}

function showCallButtons() {
  if ($('#callButtons').hasClass('d-none')) {
    $('#callButtons').removeClass('d-none');
    return;
  }

  $('#callButtons').addClass('d-none');
}

export default Sidebar;
