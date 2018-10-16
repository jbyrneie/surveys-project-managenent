/*

// @flow
import React, { PureComponent } from 'react';
import TextField from '../src';

type State = {|
  eventResult: string,
|};
export default class BasicExample extends PureComponent<void, State> {
  state = {
    eventResult:
      'Click into and out of the input above to trigger onBlur & onFocus in the Fieldbase',
  };

  onChange = (event: any) => {
    this.setState({
      eventResult: `onChange called with value: ${event.target.value}`,
    });
  };

  onBlur = () => {
    this.setState({
      eventResult: 'onBlur called from FieldBase above',
    });
  };

  onFocus = () => {
    this.setState({
      eventResult: 'onFocus called from FieldBase above',
    });
  };

  render() {
    return (
      <div>
        <TextField
          onChange={this.onChange}
          onBlur={this.onBlur}
          onFocus={this.onFocus}
          label="With change, blur & focus handlers"
        />
        <div
          style={{
            borderStyle: 'dashed',
            borderWidth: '1px',
            borderColor: '#ccc',
            padding: '0.5em',
            color: '#ccc',
            margin: '0.5em',
          }}
        >
          {this.state.eventResult}
        </div>

        <TextField label="hidden label" isLabelHidden />
        <TextField autoFocus label="autofocused" />
        <TextField value="candy" label="With default value" />
        <TextField disabled label="disabled" value="no touching" />
        <TextField required label="Required" />
        <TextField isInvalid label="Is Invalid" />
        <TextField placeholder="Click here to input" label="With Placeholder" />
        <TextField
          invalidMessage="Modal Dialog Text"
          label="with error message"
        />
        <TextField isSpellCheckEnabled={false} label="spell check disabled" />
        <TextField maxLength={5} label="Max length of 5" />
        <TextField type="Number" label="Number typed input" />
      </div>
    );
  }
}


<FieldTextArea
            label="Required with default value"
            required
            value="A default value"
            name="example-text"
          />



          // @flow
          import React, { PureComponent } from 'react';
          import FieldTextArea from '../src/FieldTextArea';

          type State = {
            onChangeResult: string,
          };

          export default class BasicExample extends PureComponent<void, State> {
            state = {
              onChangeResult: 'Type in the Field Text Area above to trigger onChange',
            };

            onChange = (event: any) => {
              this.setState({
                onChangeResult: `onChange called with value: ${event.target.value}`,
              });
            };

            render() {
              return (
                <div>
                  <FieldTextArea
                    autoFocus
                    value=""
                    label="Autofocus, placeholder text & onChange handler shown below"
                    onChange={this.onChange}
                  />

                  <div
                    style={{
                      borderStyle: 'dashed',
                      borderWidth: '1px',
                      borderColor: '#ccc',
                      padding: '0.5em',
                      color: '#ccc',
                      margin: '0.5em',
                    }}
                  >
                    {this.state.onChangeResult}
                  </div>
                  <div>
                    <FieldTextArea
                      label="Required, Spell check disabled & max length (25)"
                      isSpellCheckEnabled={false}
                      required
                      maxLength={25}
                    />
                    <FieldTextArea
                      label="Hidden label"
                      isLabelHidden
                      placeholder="Hidden Label"
                    />
                    <FieldTextArea disabled label="Disabled" value="Disabled" />
                    <FieldTextArea
                      isInvalid
                      label="Is Invalid & showing message"
                      invalidMessage="An invalid message example"
                    />
                  </div>
                </div>
              );
            }
          }

          // @flow
          import React from 'react';
          import Button, { ButtonGroup } from '../src';

          export default () => (
            <ButtonGroup>
              <Button>First Button</Button>
              <Button>Second Button</Button>
              <Button>Button Tertius</Button>
              <Button>Fourth Button</Button>
            </ButtonGroup>
          );

          // @flow

          import React, { Component } from 'react';
          import {
            DropdownMenuStateless,
            DropdownItemGroupRadio,
            DropdownItemRadio,
          } from '../src';

          type State = {
            isDropdownOpen: boolean,
          };

          export default class StatelessMenuExample extends Component<{}, State> {
            state = { isDropdownOpen: false };

            render() {
              return (
                <div>
                  <DropdownMenuStateless
                    isOpen={this.state.isDropdownOpen}
                    onOpenChange={attrs => {
                      this.setState({ isDropdownOpen: attrs.isOpen });
                    }}
                    trigger="Choose"
                    triggerType="button"
                    isMenuFixed
                  >
                    <DropdownItemGroupRadio id="cities">
                      <DropdownItemRadio id="sydney">Sydney</DropdownItemRadio>
                      <DropdownItemRadio id="melbourne">Melbourne</DropdownItemRadio>
                    </DropdownItemGroupRadio>
                  </DropdownMenuStateless>
                </div>
              );
            }
          }  

          // @flow

import React from 'react';
import Tabs from '../src';
import { Content } from './shared';

const tabs = [
  { label: 'Tab 1', content: <Content>One</Content> },
  { label: 'Tab 2', content: <Content>Two</Content> },
  { label: 'Tab 3', content: <Content>Three</Content> },
  { label: 'Tab 4', content: <Content>Four</Content> },
];

export default () => (
  <Tabs
    tabs={tabs}
    onSelect={(tab, index) => console.log('Selected Tab', index + 1)}
  />
);
*/
