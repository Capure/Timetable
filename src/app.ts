import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import {VulcanHebe, Keystore} from 'vulcan-api-js';
import * as dotenv from "dotenv";
dotenv.config();

import middlewares from './middlewares';
import api from './api';

const vulcanKeystore = new Keystore();

if (!process.env.VULCAN_KEYSTORE || !process.env.VULCAN_ACCOUNT){
    throw Error("Missing config!");
}

const {certificate, fingerprint, privateKey, firebaseToken, deviceModel} = JSON.parse(process.env.VULCAN_KEYSTORE);

vulcanKeystore.load(certificate, fingerprint, privateKey, firebaseToken, deviceModel);

const vulcanAccount = JSON.parse(process.env.VULCAN_ACCOUNT);

const VulcanClient = new VulcanHebe(vulcanKeystore, vulcanAccount);

const app: express.Application = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use('/api/v1', api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);
app.use(middlewares.limiter);

app.set('trust proxy', 'loopback'); // This allows rate limiting to work behind a proxy

app.locals.vulcan = VulcanClient;

export default app;