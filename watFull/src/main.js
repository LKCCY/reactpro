import React from 'react';
import dva from 'dva';
import router from './router';
import workModel from './models/work/workModel.js';
import UploadWorkModel from './models/UploadWorkModel.js';

const app = dva();
app.router(router);
app.model(workModel);
app.model(UploadWorkModel);
//注册
app.start("#app")
