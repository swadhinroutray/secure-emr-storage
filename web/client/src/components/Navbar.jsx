import React from 'react';
import { Link } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';

const useStyles = makeStyles((theme) => ({
	home: {
		marginTop: '8px',
		alignItems: 'center',
		marginRight: '10px',
	},
	patients: {
		marginTop: '8px',
		alignItems: 'center',
	},
	grow: {
		flexGrow: 1,
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		// display: 'none',
		// [theme.breakpoints.up('sm')]: {
		// 	display: 'block',
		// },
		flexGrow: 0,
		alignItems: 'center',
	},
	search: {
		position: 'relative',
		borderRadius: theme.shape.borderRadius,
		backgroundColor: fade(theme.palette.common.white, 0.15),
		'&:hover': {
			backgroundColor: fade(theme.palette.common.white, 0.25),
		},
		marginRight: theme.spacing(2),
		marginLeft: 0,
		width: '100%',
		[theme.breakpoints.up('sm')]: {
			marginLeft: theme.spacing(3),
			width: 'auto',
		},
	},
	searchIcon: {
		padding: theme.spacing(0, 2),
		height: '100%',
		position: 'absolute',
		pointerEvents: 'none',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	inputRoot: {
		color: 'inherit',
	},
	inputInput: {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
		transition: theme.transitions.create('width'),
		width: '100%',
		[theme.breakpoints.up('md')]: {
			width: '20ch',
		},
	},
	sectionDesktop: {
		display: 'flex',
		[theme.breakpoints.up('md')]: {
			display: 'flex',
		},
		// margin: '12px',
	},
	sectionMobile: {
		display: 'flex',
		[theme.breakpoints.up('md')]: {
			display: 'none',
		},
	},
}));

const Navbar = inject('loginStore')(
	observer(({ loginStore }) => {
		const classes = useStyles();
		const [anchorEl, setAnchorEl] = React.useState(null);
		const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(
			null
		);

		const isMenuOpen = Boolean(anchorEl);
		const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

		const handleProfileMenuOpen = (event) => {
			setAnchorEl(event.currentTarget);
		};

		const handleMobileMenuClose = () => {
			setMobileMoreAnchorEl(null);
		};

		const handleMenuClose = () => {
			setAnchorEl(null);
			handleMobileMenuClose();
		};

		const handleMobileMenuOpen = (event) => {
			setMobileMoreAnchorEl(event.currentTarget);
		};

		const menuId = 'primary-search-account-menu';
		const renderMenu = (
			<Menu
				anchorEl={anchorEl}
				anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
				id={menuId}
				keepMounted
				transformOrigin={{ vertical: 'top', horizontal: 'right' }}
				open={isMenuOpen}
				onClose={handleMenuClose}
			>
				{/* <Link to="/web3" style={{ textDecoration: 'none' }}>
					<MenuItem>Web3</MenuItem>
				</Link> */}
				<MenuItem onClick={(e) => loginStore.logout()}>Logout</MenuItem>
			</Menu>
		);

		const mobileMenuId = 'primary-search-account-menu-mobile';

		return (
			<div className={classes.grow}>
				<AppBar position="static">
					<Toolbar>
						<Typography
							className={classes.title}
							variant="h4"
							noWrap
							align="center"
						>
							EMR Storage
						</Typography>

						<div className={classes.grow} />
						<div className={classes.sectionDesktop}>
							<Link
								style={{
									textDecoration: 'none',
									color: 'white',
								}}
								to="/home"
								color="inherit"
								justifyContent="center"
							>
								<Typography
									className={classes.home}
									color="inherit"
									variant="h5"
									noWrap
									align="center"
								>
									Home
								</Typography>
							</Link>
							<Link
								style={{
									textDecoration: 'none',
									color: 'white',
								}}
								to="/register"
								color="inherit"
								justifyContent="center"
							>
								<Typography
									className={classes.home}
									color="inherit"
									variant="h5"
									noWrap
									align="center"
								>
									Register
								</Typography>
							</Link>
							<Link
								style={{
									textDecoration: 'none',
									color: 'white',
								}}
								to="/patients"
								color="inherit"
								justifyContent="center"
							>
								<Typography
									className={classes.patients}
									color="inherit"
									variant="h5"
									noWrap
									align="center"
								>
									Patients
								</Typography>
							</Link>
							<IconButton
								edge="end"
								aria-label="account of current user"
								aria-controls={menuId}
								aria-haspopup="true"
								onClick={handleProfileMenuOpen}
								color="inherit"
							>
								<AccountCircle />
							</IconButton>
						</div>
					</Toolbar>
				</AppBar>
				{renderMenu}
			</div>
		);
	})
);
export default Navbar;
