

# Selling Sunset: Renovate Your Data with Tableau Prep Instruction Guide

## Step 0: Preliminaries
In this section, we will be setting up the pre-requisites to building our flow.

First, login to the Lab with this password: **Pa$$w0rd**

 ++++Pa$$w0rd++++ 

Next:

1. Register via the HOT portal (provision your Tableau Cloud license)
   * 1.1. Use this link: [https://hot.demo.tableau.com/register/1728](https://hot.demo.tableau.com/register/1728)
   * 1.2. Check your email for the Tableau Cloud password setup link
   * 1.3. Set you password and login with your credentials

2. Launch TabPy Server
   * 2.1. Navigate to 'Lab Files' folder on desktop of VM
   * 2.2. Double-click the 'start_tabpy' .bat file and select 'Run'
   * 2.3. Type 'y' and hit enter to login → do not close this window!
   
          !IMAGE[1.png](instructions340649/1.png)

          !IMAGE[2.png](instructions340649/2.png)
   
   If you encounter any issues, open the command prompt by typing cmd in the windows search bar. Then copy-paste the following into the console and hit Enter:
   ```cmd
   cd "C:\Users\LabUser\Desktop\Lab Files"
   "C:\Users\LabUser\Desktop\Lab Files\tabpy\tabpy_env\Scripts\activate.bat"
   tabpy
   ```

   !IMAGE[3.png](instructions340649/3.png)

3. Launch Tableau Prep
   * 3.1. Double-click 'TC26_tabprep' in Lab Files folder
   * 3.2. OR simply click the Tableau Prep logo in the taskbar
     * 3.2.1. Make sure you are running this within the VM, not from your machine/desktop
     !IMAGE[4.png](instructions340649/4.png)


4. Start Tableau Prep Agent (Connect to Tableau Cloud site)
   * 4.1. Navigate to the 'Server' drop down and click 'Sign In'
   * 4.2. Select 'Quick Connect Tableau Cloud
     * 4.2.1. Use your email and password from step 1
     * 4.2.2. Site URI: hot-1728
     
     !IMAGE[5.png](instructions340649/5.png)

        * You can open Agent by clicking the Astro / astronaut icon in the top right corner of Tableau Prep.  

    	!IMAGE[12.png](instructions340649/12.png)
        !IMAGE[13.png](instructions340649/13.png)
    

## Step 1: Connect, Prep & Cleanse
In this section we will connect to the `starter_files_sheet1` file (Lab Files → datasets) and union that with the other files in the folder with a matching name. Then we'll build a series of data cleansing steps. Not all cleansing steps are needed to be completed to finish this section - see how many you can complete in the given time!

1. Connect to Data
   * 1.1. Select the 'Connect to Data' button and navigate to starter_files_sheet1
   * OR simply drag file from the folder onto Tab Prep!
   * Lab Files → datasets → 'starter_files_sheet1'
    !IMAGE[6.png](instructions340649/6.png)
   

2. Union Multiple Files
   * 2.1. In the Input tool config, navigate to the 2nd tab 'Tables'
   * 2.2. Select Union Multiple files and click '+ Add File Filters' → file name
   * 2.3. Select File name 'Matches' and type 'starter*' and hit enter and Apply
   * !IMAGE[8.png](instructions340649/8.png)


3. Cleanse steps - not all are required! (use Agent! Solve as many as possible + have fun!!)
   * 3.1. Nulls (prop_id): right click the null value in the profile pane and select Exclude
   * 3.2. Spaces (prop_id): select Clean from the profile pane and Remove All Spaces
   * 3.3. Duplicates (prop_id): select Identify Duplicate Rows, exclude duplicates
   * 3.4. Remove characters (address): select Clean, Remove Punctuation
   * 3.5. Split field (address): select Split Values, Custom Split, select All, split by ,
   * 3.6. Rename address fields: - street, city, state
   * 3.7. Fix spelling (city): select Group Values and Spelling
   * 3.8. Fix case (state): select Clean, Make Uppercase
   * 3.9. Group values (home_type): select Group Values and Spelling
   * 3.10. Remove fields (note and File paths): click Recommendation lightbulb and select action
   * 3.11. Update field with descriptive text (condition)
     * *prompt the agent:* `please update the condition field to be more descriptive with text? condition 1 should be very poor and 5 should be excellent. You can fill in the rest`
     *  OR create a calculated fied: `CASE [condition] WHEN 1 THEN 'Poor' WHEN 2 THEN 'Okay' WHEN 3 THEN 'Good' WHEN 4 THEN 'Very Good' WHEN 5 THEN 'Excellent' END`
   * 3.12. Convert km to mi using agent (distance_coast_km, distance_metro_km)
     * *prompt the agent:* `create a new field called distance_coast_mi that converts dist_coast_km from km to mi`
     * OR create a calculated field: `ROUND([dist_coast_km] * 0.621371, 1)`
     * *prompt the agent:* `create a new field called distance_metro_mi that converts dist_metro_km from km to mi`
     * OR create a calculated field: `ROUND([dist_metro_km] * 0.621371, 1)`
     * !IMAGE[9.png](instructions340649/9.png)
     * !IMAGE[11.png](instructions340649/11.png)


## Step 2: Pivot & Join
In this section, we will be adding a new file (home_description), pivot the fields in that data and then joining to the other data stream in the flow to create a single combined view.

1. Input Home_Description & Pivot columns
   * 1.1. Add an Input tool connect to Home_Description from Lab Files → datasets
   * 1.2. Select + to insert a Pivot step after the input
     * 1.2.3. Make sure the configuration is set to 'Columns to Rows'
   * 1.3 Highlight all fields and drag into the whitespace in the config menu
     * 1.3.1. Update the data type of the newly pivoted field (Pivot1 Names) to Number
     !IMAGE[814.png](instructions340649/814.png)
    !IMAGE[812.png](instructions340649/812.png)
     !IMAGE[813.png](instructions340649/813.png)

2. 2. Join Home_Descriptions to other data stream
   * 2.1. Select + after the Pivot step to insert a Join step
   * 2.2. Drag the last Clean step (from the other data stream) to the left side of the Join
   * 2.3. Drop it on 'Add to'
    !IMAGE[16.png](instructions340649/16.png)
   
3. Configure Join
   * 3.1. Select 'Add' to create a join clause
   * 3.2. Configure an INNER join
     * 3.2.1. Pivot1 Names = home_description
     * --> If you encounter an error here, go back to the Pivot step and update the data type of Pivot1 Names field to number
    !IMAGE[81.png](instructions340649/81.png)

## Step 3: Predictive (TabPy)
In this section, we will be removing any unneeded fields with a cleanse step and then setting up our predictive model with the Script tool. The Script tool must be configured to point to the python file called `predict_home_prices.py` (in Lab files → tabpy). Finally, we will create a variance / price diff calculation.

1. Remove unneeded fields before prediction step
   * 1.1. Click + to add a Clean step after the previous Join step
   * 1.2. Remove unneeded fields (Pivot1 Names, home_description)
     * 1.2.1 Keep the Pivot1 Values field and rename to `home_description`
2. Predictive Model (TabPy)
   * 2.1. Click + to add a Script step
   * 2.2. Configure the Script:
     * 2.2.1. Set Connection type to Tableau Python (TabPy) Server
     * 2.2.2. Use the Browse button to locate python model file (Lab Files → tabpy → predict_home_prices.py)
     * 2.2.3. Set the Function Name: `predict_home_prices` and wait for new field to populate (Hint - you should be able to see the code running in your cdm terminal)
     * !IMAGE[30.png](instructions340649/30.png)
     * !IMAGE[31.png](instructions340649/31.png)
     * !IMAGE[32.png](instructions340649/32.png)
3. Create Variance calculation OR a simple price diff calc
   * 3.1. Calculate the % diff between actual price and predicted price
   * 3.2. Create a new field called price_variance_pct:
     * `ROUND((([home_price_prediction] - [home_price]) / [home_price])*100,1)`
     * OR create a simple price diff: `ROUND([home_price_prediction]-[home_price],0)`
     * !IMAGE[33.png](instructions340649/33.png)
     * !IMAGE[34.png](instructions340649/34.png)

## Step 4: Spatial
In this section, using the home_lat and home_long fields in our data to create a spatial point field using the Makepoint() function in a calculated field. Then we will bring in our Zip Code spatial file called `ZIP_CODES.shp` (Lab Files→ datasets → zip_codes).

1. Create spatial point field from home lat/long
   * 1.1 Click + to add a Clean step after the prior Script step
   * 1.2 Click the … in the toolbar and select Create Calculated Field (OR click the tool dropdown within the home_lat field)
   * 1.3 Create a new calculated field called 'home_point'
     * `Makepoint(home_lat, home_long)`
     * !IMAGE[41.png](instructions340649/41.png)
     
2. Add the Zip Codes file
   * 2.1. Use an Input to add the Zip Codes spatial file to the flow
     * 2.1.1. Lab Files → datasets → zip_codes → ZIP_CODES.shp
     * !IMAGE[40.png](instructions340649/40.png)
3. Create a Spatial Join
   * 3.1. Click + button after either step to add a Join
   * 3.2. Create FULL OUTTER Join using `home_point = Geometry`
     * 3.2.1. The join should appear as 'Intersects'
     * !IMAGE[42.png](instructions340649/42.png)

## Step 5: Parameter & Output
In this section, we will create a parameter for end users to give them the ability to select which home types they'd like to run the prediction on using the home_type field. Then we'll configure the Output tool to save a Hyper file to the desktop and run the flow.

1. Remove any remaining unneeded fields
   * 1.1. Remove any unneeded fields to simplify dataset before output
     * 1.1.1. ex.) SHAPE_STLe, SHAPE_STAr
2. Create a Parameter for end users
   * 2.1. Click the Parameter icon at top of the UI (looks like sliders)
   * 2.2. Create a Parameter called home_type and list selectable values
     * 2.2.1. `Attached`, `Condo`, `Single Family`, `Townhome`
     * !IMAGE[44.png](instructions340649/44.png)

     !IMAGE[45.png](instructions340649/45.png)
   * 2.3 Create a Filter calculation anywhere in the flow - anywhere before the Prediction step is best, such as the initial clean step! 
     * 2.3.1. `[home_type] = [Parameters].[home_type]`
     * !IMAGE[46.png](instructions340649/46.png)
3. Output
   * 3.1. Configure output to save to desktop, save as a Hyper file (notice the parameter options in output menu!)
   * 3.2. Click Run Flow and select parameter option
   * !IMAGE[47.png](instructions340649/47.png)

## Extra Credit: Analysis in Tableau Desktop
In this section, we'll open the dataset in Tableau Desktop. The best option is to delete the parameter we just created, and select Preview in Tableau Desktop by right clicking the last clean step on the flow - this will allow us to see all home_types. Otherwise, opening the recently created Hyper is perfectly fine. In Tableau Desktop, we will visualize zip codes by dragging GEOMETRY onto the canvas and adding ZIP to detail on the marks card. Next, we can view the homes by dragging home_point on the canvas and adding prop_ID to detail on the marks card.

1. Preview in Tableau Desktop to see full results
   * 1.1. Delete parameter we just created so we can view the entire dataset
   * 1.2. Re-run the output OR right click the last clean step, select Preview in Tableau Desktop from the dropdown
   * !IMAGE[60.png](instructions340649/60.png)
   * !IMAGE[61.png](instructions340649/61.png)
   
2. Explore in Tableau Desktop
   * 2.1. Drag Geomtery to canvas to view zipcodes
     * 2.1.1. Add ZIP to detail
   * 2.2. Drag home_point to canvas
     * 2.1.1. Add prop_ID to detail
     * 2.1.2. Color using home_price OR price_variance_pct
     * 2.1.3. Add any additional attributes to marks card
     
!IMAGE[9b6d4b6d-e43d-4804-812e-9b98d7ad2e55.png](instructions340649/9b6d4b6d-e43d-4804-812e-9b98d7ad2e55.png)
  
  CONGRATS! You are officially a San Diego Real Estate Mogul! 
       
!IMAGE[32d69505-b823-47af-aa92-df4fb293e5ae.png](instructions340649/32d69505-b823-47af-aa92-df4fb293e5ae.png)