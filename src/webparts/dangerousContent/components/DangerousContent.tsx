import * as React from 'react';
import styles from './DangerousContent.module.scss';
import { IDangerousContentProps } from './IDangerousContentProps';
import { escape } from '@microsoft/sp-lodash-subset';

import {SPHttpClient, SPHttpClientResponse} from '@microsoft/sp-http';

const DangerousContent:React.FunctionComponent<IDangerousContentProps> = (props) => {

  const emptyNode = document.createRange().createContextualFragment("<div></div>");

  const [appendedNode, setAppendedNode] = React.useState(emptyNode);

  React.useEffect(() => {
    async function fetchSnippet() {
      const snippetURL = props.ctx.pageContext.web.absoluteUrl + `/_api/web/getFileByServerRelativeUrl('${props.url}')/$value`;
      const htmlFragment: string = (props.url) ? 
      await props.ctx.spHttpClient.get(snippetURL, SPHttpClient.configurations.v1)
      .then((response: SPHttpClientResponse) => {return response.text();})
      :"<div>No content loaded.</div>";
      const node = document.createRange().createContextualFragment(htmlFragment);
      setAppendedNode(node);
    }
    fetchSnippet();
  },[props.url, props.displayMode]);

  if (props.url) {
    return (
            <div ref={ref => {if (ref) {ref.innerHTML=""; ref.appendChild(appendedNode);}}}>
            </div>
    );
  }

  else {
    return (
        <div className={ styles.container }>
          <div className={ styles.row }>
              <p className={ styles.description }>{escape(props.description)}</p>
              <div>Instructions:</div>
              <div>1. Save your html snippet in a txt file and upload it to a SharePoint library</div>
              <div>2. In the Web Part settings, enter the relative path to the file.</div>
              <div>It should look something like:</div>
              <div>{"/sites/<SiteName>/<LibraryName>/MySnippet.txt"}</div>
              <div>{"/teams/<SiteName>/<LibraryName>/MySnippet.txt"}</div>
          </div>
        </div>
    );
  }

};

export default DangerousContent;