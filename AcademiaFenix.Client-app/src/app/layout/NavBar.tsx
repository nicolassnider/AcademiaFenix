import { Button, ButtonGroup, Container, Dropdown, Image, Menu } from 'semantic-ui-react'
import { Link, NavLink } from 'react-router-dom';

import { observer } from 'mobx-react-lite';
import { useStore } from '../stores/store';

function NavBar() {
    const { userStore: { user, logout } } = useStore();
    return (
        <>
            <Menu inverted fixed='top'>
                <Container>
                    <Menu.Item as={NavLink} to='/' header>
                        <img src="/assets/logo.png" alt="logo" style={{ marginRight: '10px' }} />
                        Academia Fenix
                    </Menu.Item>
                    <Menu.Item as={NavLink} to='/students' name='Students' />
                    <Menu.Item as={NavLink} to='/errors' name='Errors' />
                    <Menu.Item>
                        {/*<Button onClick={() => studentStore.openForm()} positive content='Create Student' />*/}
                        <Button as={NavLink} to='/createStudent' positive content='Create Student' />
                    </Menu.Item>
                    {user && (
                        <Menu.Item position='right'>
                            <Image src={user?.image || '/assets/user.png'} avatar spaced='right' />
                            <Dropdown pointing='top left' text={user?.displayName}>
                                <Dropdown.Menu>
                                    <Dropdown.Item as={Link} to={`/profiles/${user?.userName}`} text='My profile' icon='user' />
                                    <Dropdown.Item onClick={logout} text='Logout' icon='power' />

                                </Dropdown.Menu>

                            </Dropdown>
                        </Menu.Item>
                    )}
                    {!user && (
                        <Menu.Item position='right'>
                            <ButtonGroup>
                                <Button as={NavLink} to='/login' positive content='Login' />
                                <Button as={NavLink} to='/register' positive content='Register' />
                            </ButtonGroup>
                        </Menu.Item>
                        
                        
                    )}


                </Container>
            </Menu>
        </>
    )
}

export default observer(NavBar)