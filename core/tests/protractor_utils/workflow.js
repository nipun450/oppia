// Copyright 2014 The Oppia Authors. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS-IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * @fileoverview Utilities for exploration creation, publication ect. when
 * carrrying out end-to-end testing with protractor.
 *
 * @author Jacob Davis (jacobdavis11@gmail.com)
 */

forms = require('./forms.js');

// Creates an exploration and opens its editor.
var createExploration = function(name, category) {
  browser.get('/gallery');
  element(by.css('.protractor-test-create-exploration')).click();
  element(by.model('newExplorationTitle')).sendKeys(name);
  forms.editAutocompleteDropdown(element(by.tagName('select2-dropdown'))).
    setText(category);
  element(by.css('.select2-container')).click();
  element(by.css('.select2-input')).sendKeys(category + '\n');
  element(by.buttonText('Add New Exploration')).click();
};

// Moves from exploration editor view to player view; there must be no unsaved
// changes.
// NOTE: we do not use the preview button because that will open a new window.
var moveToPlayer = function() {
  browser.getCurrentUrl().then(function(url) {
    expect(url.slice(0, 29)).toBe('http://localhost:4445/create/');
    var explorationId = url.slice(29, 41);
    browser.get('/explore/' + explorationId);
  });
};

exports.createExploration = createExploration;
exports.moveToPlayer = moveToPlayer;