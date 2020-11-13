import React, { useEffect, useState } from 'react';
import MaterialTable from 'material-table';

import './user-dashboard.scss';

import { axiosWithAuth } from '../../../utils/auth/axiosWithAuth';
import ProgressBar from '../../../components/progress-bar/progress-bar';
import Skeleton from '@material-ui/lab/Skeleton';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { tableIcons } from '../../../utils/material-table-icons';

export default function MaterialTableDemo() {
	return <h1>user dashboard</h1>;
}
