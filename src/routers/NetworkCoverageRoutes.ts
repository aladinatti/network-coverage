import { Router } from 'express';
import {NetworkCoverageController} from '../controllers/NetworkCoverageController';

export class NetworkCoverageRoutes {
  public router: Router;
  private _controller: NetworkCoverageController;

  constructor() {
    this.router = Router();
    this._controller = new NetworkCoverageController();
    this._config();
}

  /**
   * Connect routes to their matching controller endpoints.
   */
  private _config() {
    this.router.get('/', (req, res) => {this._controller.getNetworkCoverage(req, res);});
  }
}
