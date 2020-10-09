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

export interface IDangerousContentWebPartProps {
  mode: string;
  description: string;
  url: string;
}

export default class DangerousContentWebPart extends BaseClientSideWebPart<IDangerousContentWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IDangerousContentProps> = React.createElement(
      DangerousContent,
      {
        ctx: this.context,
        displayMode: this.displayMode,
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
