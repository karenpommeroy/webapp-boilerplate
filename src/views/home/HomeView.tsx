import React from "react";
import {useTranslation} from "react-i18next";

import CircleIcon from "@mui/icons-material/Circle";
import VolumeDown from "@mui/icons-material/VolumeDown";
import VolumeUp from "@mui/icons-material/VolumeUp";
import {
    Box,
    Button,
    Checkbox,
    Divider,
    FormControl,
    FormControlLabel,
    FormGroup,
    InputLabel,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    MenuItem,
    Paper,
    Radio,
    RadioGroup,
    Select,
    Slider,
    Stack,
    Switch,
    TextField,
    Typography,
} from "@mui/material";

import Styles from "./HomeView.styl";

export const HomeView: React.FC = () => {
    const {t} = useTranslation();

    return (
        <Box className={Styles.home}>
            <Stack direction="row" spacing={1}>
                <Button variant="contained" color="primary">
                    {t("primary")}
                </Button>
                <Button variant="contained" color="secondary">
                    {t("secondary")}
                </Button>
                <Button variant="contained" color="error">
                    {t("error")}
                </Button>
                <Button variant="contained" color="warning">
                    {t("warning")}
                </Button>
                <Button variant="contained" color="success">
                    {t("success")}
                </Button>
                <Button variant="contained" color="info">
                    {t("info")}
                </Button>
            </Stack>
            <Stack direction="row" spacing={2} margin={2}>
                <Stack className={Styles.colorBox} bgcolor="primary.light" padding={3}>
                    <Typography variant="subtitle1" color="textPrimary">
                        Primary Light (Text Primary)
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                        Primary Light (Text Secondary)
                    </Typography>
                </Stack>
                <Stack className={Styles.colorBox} bgcolor="primary.main" padding={3}>
                    <Typography variant="subtitle1" color="textPrimary">
                        Primary Main (Text Primary)
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                        Primary Main (Text Secondary)
                    </Typography>
                </Stack>
                <Stack className={Styles.colorBox} bgcolor="primary.dark" padding={3}>
                    <Typography variant="subtitle1" color="textPrimary">
                        Primary Dark (Text Primary)
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                        Primary Dark (Text Secondary)
                    </Typography>
                </Stack>
            </Stack>
            <Stack direction="row" spacing={2} margin={2}>
                <Stack className={Styles.colorBox} bgcolor="secondary.light" padding={3}>
                    <Typography variant="subtitle1" color="textPrimary">
                        Primary Light (Text Primary)
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                        Primary Light (Text Secondary)
                    </Typography>
                </Stack>
                <Stack className={Styles.colorBox} bgcolor="secondary.main" padding={3}>
                    <Typography variant="subtitle1" color="textPrimary">
                        Primary Main (Text Primary)
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                        Primary Main (Text Secondary)
                    </Typography>
                </Stack>
                <Stack className={Styles.colorBox} bgcolor="secondary.dark" padding={3}>
                    <Typography variant="subtitle1" color="textPrimary">
                        Primary Dark (Text Primary)
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                        Primary Dark (Text Secondary)
                    </Typography>
                </Stack>
            </Stack>
            <Stack direction="row" spacing={2} margin={2}>
                <Box component={Paper} sx={{width: "100%", maxWidth: 360, bgcolor: "background.paper"}}>
                    <nav aria-label="main mailbox folders">
                        <List>
                            <ListItem disablePadding>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <CircleIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Inbox" />
                                </ListItemButton>
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <CircleIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Drafts" />
                                </ListItemButton>
                            </ListItem>
                        </List>
                    </nav>
                    <Divider />
                    <nav aria-label="secondary mailbox folders">
                        <List>
                            <ListItem disablePadding>
                                <ListItemButton>
                                    <ListItemText primary="Trash" />
                                </ListItemButton>
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemButton>
                                    <ListItemText primary="Spam" />
                                </ListItemButton>
                            </ListItem>
                        </List>
                    </nav>
                </Box>
                <Stack spacing={3} direction="column" flexGrow={1}>
                    <FormControl fullWidth>
                        <InputLabel>Label</InputLabel>
                        <Select defaultValue={10} label="Label">
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl fullWidth>
                        <InputLabel>Label</InputLabel>
                        <Select variant="filled" defaultValue={20} label="Label">
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField required label="Required" defaultValue="Hello World" />
                    <TextField disabled label="Disabled" defaultValue="Hello World" />
                </Stack>
                <Stack spacing={1} direction="column" flexGrow={1}>
                    <FormGroup row sx={{justifyContent: "space-evenly"}}>
                        <FormControlLabel control={<Switch defaultChecked />} label="Label" />
                        <FormControlLabel required control={<Switch />} label="Required" />
                        <FormControlLabel disabled control={<Switch />} label="Disabled" />
                    </FormGroup>
                    <FormGroup row sx={{justifyContent: "space-evenly"}}>
                        <FormControlLabel control={<Checkbox defaultChecked />} label="Label" />
                        <FormControlLabel required control={<Checkbox />} label="Required" />
                        <FormControlLabel disabled control={<Checkbox />} label="Disabled" />
                    </FormGroup>
                    <RadioGroup row defaultValue="female" sx={{justifyContent: "space-evenly"}}>
                        <FormControlLabel value="female" control={<Radio />} label="Female" />
                        <FormControlLabel value="male" control={<Radio />} label="Male" />
                        <FormControlLabel value="other" control={<Radio disabled />} label="Other" />
                    </RadioGroup>
                    <Stack spacing={2} direction="row" sx={{alignItems: "center", mb: 1}}>
                        <VolumeDown />
                        <Slider aria-label="Volume" defaultValue={66} />
                        <VolumeUp />
                    </Stack>
                    <Slider disabled defaultValue={30} />
                </Stack>
            </Stack>
        </Box>
    );
};

export default HomeView;
