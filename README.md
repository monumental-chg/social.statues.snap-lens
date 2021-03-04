# Monumental Change Snapchat Lens

Monumental Change seeks the peaceful removal of monuments to colonial oppression around the world. The repository houses a snapchat lens which can be _relatively easily_ modified to share the Monumental Change movement by animating these monuments telling people of their crimes and why they should be removed.

![Image of Yaktocatx](https://firebasestorage.googleapis.com/v0/b/monumental-chg.appspot.com/o/mon-chg-lens-lq.gif?alt=media&token=6fd3e277-8971-4ba6-b2c1-b65f1d2b25fb)

# The project

This lens feeds the statue's texture onto a generic male 3D face model, with rigged facial mo-cap data.
The size, scale and position is mapped to the statue's face. **No coding required.**
Upon detecting a statue/face - an audio file plays,sycned to the model animaiton.

![Image of Yaktocatx](https://firebasestorage.googleapis.com/v0/b/monumental-chg.appspot.com/o/mon-chg-lens-lq.gif?alt=media&token=6fd3e277-8971-4ba6-b2c1-b65f1d2b25fb =250x)

## Dependancies

The lens is built in Snapchat lens studio v3.3.3, other versions are likely supported.

## How to guide

```
Drop your audio file into /Public/Scripts/ControllerScript.js
```

For best results we recomend using face mocap technologies ie iOS/android apps to match the audio file
to the generic 3D face.

## Licence

MIT License.

_THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE._
