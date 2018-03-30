steps.

folders 
__tests__
__tests__/components
src/datasource

**enzymedependency****
add file setupTests.js

src/components/REProperties.js
__tests__/components/REProperties.test.js

APP component  test for REProperties 


Redux

1.added set action and reducer
2.store ,reducer,action  in index.js
3.App for REProperties removed data.json cause its already incorporated in index.js

4.App.test changed for //ReactDOM.unmountComponentAtNode  doesn't work cause App  wrapped in provider

5.REProperties with connect and t mapStateToProps 

6.REProperty test changed import { REProperties }  from '../../components/REProperties'; cause earlier export was default.
7. Test REProperties  for  connect and REProperties single tag and its initial properties

 

