import { DisplayMode } from '@microsoft/sp-core-library';
import {WebPartContext} from '@microsoft/sp-webpart-base';

export interface IDangerousContentProps {
  ctx: WebPartContext;
  displayMode: DisplayMode;
  mode:string;
  description: string;
  url: string;
}
