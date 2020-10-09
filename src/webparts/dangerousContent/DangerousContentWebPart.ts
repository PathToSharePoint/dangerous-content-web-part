import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneDropdown,
  IPropertyPaneDropdownOption
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'DangerousContentWebPartStrings';
import DangerousContent from './components/DangerousContent';
import { IDangerousContentProps } from './components/IDangerousContentProps';

import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/files";
import "@pnp/sp/folders";

export interface IDangerousContentWebPartProps {
  mode: string;
  description: string;
  url: string;
}

export default class DangerousContentWebPart extends BaseClientSideWebPart<IDangerousContentWebPartProps> {
  
    // protected async onInit(): Promise<void> {
  
    //   await super.onInit();
    
    //   // other init code may be present
    
    //   sp.setup(this.context);
    // }
  public render(): void {
    const element: React.ReactElement<IDangerousContentProps> = React.createElement(
      DangerousContent,
      {
        ctx: this.context,
        mode: this.properties.mode,
        description: this.properties.description,
        url: this.properties.url
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  // protected get dataVersion(): Version {
  //   return Version.parse('0.5.0');
  // }

  private sanitizeModes: IPropertyPaneDropdownOption[] = [{key:"Dangerous",text:"Dangerous"}];

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneDropdown('mode', {
                  label: strings.ModeFieldLabel,
                  options: this.sanitizeModes,
                  selectedKey: "Dangerous",
                  disabled: true
                }),
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                }),
                PropertyPaneTextField('url', {
                  label: strings.UrlFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
