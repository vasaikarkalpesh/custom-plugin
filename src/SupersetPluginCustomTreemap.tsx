/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
import React, { useEffect, createRef } from 'react';
import { styled } from '@superset-ui/core';
import { SupersetPluginCustomTreemapProps, SupersetPluginCustomTreemapStylesProps } from './types';
import { TreeMapComponent, LevelsDirective, LevelDirective, Inject, TreeMapLegend, TreeMapTooltip } from '@syncfusion/ej2-react-treemap';
import { updateSampleSection } from './sample-base';
// import * as data from './treemap-data/car-sales.json';

// const SAMPLE_CSS = `
// .control-fluid {
//     padding: 0px !important;
//     }`;


// The following Styles component is a <div> element, which has been styled using Emotion
// For docs, visit https://emotion.sh/docs/styled

// Theming variables are provided for your use via a ThemeProvider
// imported from @superset-ui/core. For variables available, please visit
// https://github.com/apache-superset/superset-ui/blob/master/packages/superset-ui-core/src/style/index.ts

const Styles = styled.div<SupersetPluginCustomTreemapStylesProps>`
  padding: ${({ theme }) => theme.gridUnit * 1}px;
  border-radius: ${({ theme }) => theme.gridUnit * 1}px;
  height: ${({ height }) => height}px;
  width: ${({ width }) => width}px;

  h3 {
    /* You can use your props to control CSS! */
    margin-top: 0;
    margin-bottom: ${({ theme }) => theme.gridUnit * 3}px;
    font-size: ${({ theme, headerFontSize }) => theme.typography.sizes[headerFontSize]}px;
    font-weight: ${({ theme, boldText }) => theme.typography.weights[boldText ? 'bold' : 'normal']};
  }

  pre {
    height: ${({ theme, headerFontSize, height }) => (
      height - theme.gridUnit * 12 - theme.typography.sizes[headerFontSize]
    )}px;
  }
  #treemap-container_TreeMapTooltip {
    /*top: 0% !important;*/
    width: 500px !important;
    font-size:8px !important;
    background-color: white !important;
    padding-left:10px !important;
    font-weight:600 !important;
    line-height:0.8rem !important;
    z-index: 1 !important;
  }
  .row{
    line-height: 0.8rem !important;
  }
  p {
    margin-block-start: 0.2em;
    margin-block-end: 0.2em;
  }`;

/**
 * ******************* WHAT YOU CAN BUILD HERE *******************
 *  In essence, a chart is given a few key ingredients to work with:
 *  * Data: provided via `props.data`
 *  * A DOM element
 *  * FormData (your controls!) provided as props by transformProps.ts
 */

export default function SupersetPluginCustomTreemap(props: SupersetPluginCustomTreemapProps) {
  // height and width are the height and width of the DOM element as it exists in the dashboard.
  // There is also a `data` prop, which is, of course, your DATA 🎉
  const { data, height, width } = props;

  const rootElem = createRef<HTMLDivElement>();
  const treeData = {
      "treeData" : data
  }
  console.log("treeData",treeData )
  let datasource = treeData;
  console.log("datasource",datasource)
  // Often, you just want to access the DOM and do whatever you want.
  // Here, you can do that with createRef, and the useEffect hook.
  useEffect(() => {
    const root = rootElem.current as HTMLElement;
    console.log('Plugin element', root);
    let $: any = (window as any)["jQuery"];
    $("#treeMapMeasureText").prev().css("display","none")
  });
  useEffect(() => {
    updateSampleSection();
  }, []);

  function load(args:any) {
  }
  /* tslint:disable:no-string-literal */
  function itemMove(args:any) {
    let storeNames = args.item.data.storename.split("|");
    let subdivisionNames = args.item.data.subdivision.split("|");
    args.item['data'].product_qty = args.item['weight'];
    let html ='<div class="row"><div class="col-md-6">';
    html +='<br/><b style="font-size:10px;">Available at: </b>';

    // for(let i=0;i < 30;i++){
    //   html+= storeNames[i] && storeNames[i] != undefined && subdivisionNames[i] && subdivisionNames[i] != undefined ? `<p> * ${storeNames[i]} (${subdivisionNames[i]})</p>`:'';
    // }
    // html +='</div>';
    // if(storeNames.length > 30  ){
    // html +='<div class="col-md-4">';
    //   for(let i = 30; i < 60;i++){
    //     html+= storeNames && storeNames[i] != undefined && subdivisionNames[i] != undefined ? `<p> * ${storeNames[i]} (${subdivisionNames[i]})</p>`:'';
    //   }
    //   html +='</div>';
    // }

    // if(storeNames.length > 60 ){
    //   html +='<div class="col-md-4">';
    //   for(let i=60;i < storeNames.length;i++){
    //     html+= storeNames && storeNames[i] != undefined && subdivisionNames[i] != undefined ? `<p> * ${storeNames[i]} (${subdivisionNames[i]})</p>`:'';
    //   }
    //   html +='</div>';
    // }

    for (let k = 0; k < storeNames.length; k+=2) {
        html+= storeNames && storeNames[k] != undefined && subdivisionNames[k] != undefined ?
        `<p> * ${storeNames[k]} (${subdivisionNames[k]})</p>`:''
    }
    html +='</div>';
    html +='<br/><div class="col-md-6">';
    for(let i=0; i< storeNames.length; i++ ){
      if (i % 2 != 0) {
        html+= storeNames && storeNames[i] != undefined && subdivisionNames[i] != undefined ?
        `<p> * ${storeNames[i]} (${subdivisionNames[i]})</p>`:''
   }
  }

    html +='</div></div>';
    // html+='<p>Kalpesh (test subsivision)</p>';
    // html+='<p>Kalpesh1 (test subsivision1)</p>';
    // console.log("HTML",html)
    // args.treemap.tooltipSettings.format = args.item['groupIndex'] === 0 ? 'Material Class: ${Material Class}<br>subdivision: ${subdivision}<br>product Quntity: ${product_qty}' :
    //     'Material Class: ${Material Class}<br>storename: ${storename}<br>product Quntity: ${product_qty}<br>${html}';
    // args.treemap.tooltipSettings.template = args.item['groupIndex'] === 0 ? '' :
    // `${html}`+ '<br>Material Type: ${materialhead}<br>Product Quntity: ${product_qty}';
     args.treemap.tooltipSettings.template = args.item['groupIndex'] === 0 ? '' :
  `${html}`+'<br><div class="row"><div class="col-md-6"><p> <b>Material Type</b>: ${materialhead}</div></p></div> <br/>';
  }

  console.log('Plugin props', props);
  console.log('DATA',data);
  return (
      <Styles
      ref={rootElem}
      boldText={props.boldText}
      headerFontSize={props.headerFontSize}
      height={height}
      width={width}
    >
      {/* <h3>{props.headerText}</h3>
      <pre>${JSON.stringify(data, null, 2)}</pre> */}
      <div className='control-pane' style={{ height:height,width:width}}>
            <div className='control-section'>
            <TreeMapComponent itemClick={itemMove.bind(this)} itemMove={itemMove.bind(this)} load={load.bind(this)} id='treemap-container' titleSettings={{
            text: 'Available Sizes',
            textStyle: { size: '20px' }
        }}
        rangeColorValuePath='size' format={"n"} useGroupingSeparator={true} dataSource={datasource.treeData} legendSettings={{
            visible: true,
            position: 'Top',
            shape: 'Rectangle',
            textStyle: { size: '15px' }

        }}
        palette={['#7450B2', '#9668CE', '#AD81EA', '#853169', '#742F6A', '#632D6C', '#532C6D', '#412A6F', '#312870', '#1D2671']}
         tooltipSettings={{ visible: true, textStyle: { size: '10px'},  border: { color: 'white', width: 0.5 }}}
            weightValuePath='product_qty' leafItemSettings={{
            labelPath: 'product_qty',
            labelFormat:'  ${size} mm <br>Q - ${product_qty}Km <br>',
            border: { color: 'white', width: 3 },
            labelPosition:'TopLeft',
            labelStyle:{
              size: '9px',
              color:'white'
            },
            interSectAction:'WrapByWord'

        }}>
                    <Inject services={[TreeMapLegend, TreeMapTooltip]}/>
                    <LevelsDirective>
                        <LevelDirective groupPath='Material Class' headerStyle={{ size:'15px',color:'white' }} />
                    </LevelsDirective>
                </TreeMapComponent>
            </div>
      </div>
    </Styles>
  );
}
