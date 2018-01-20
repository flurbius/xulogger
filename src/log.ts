/* Copyright xerysherry 2018
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *      http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

export enum Level {
    None =      0b1,
    Error =     0b10,
    Debug =     0b100, 
    Warning =   0b1000, 
    Info =      0b10000, 

    Level_1 = Level.None   |Level.Error,
    Level_2 = Level.Level_1|Level.Debug,
    Level_3 = Level.Level_2|Level.Warning,
    Level_4 = Level.Level_3|Level.Info,

    All = Level.Level_4,
};

export interface ILog
{
    Log(level:number, message:string): void
}