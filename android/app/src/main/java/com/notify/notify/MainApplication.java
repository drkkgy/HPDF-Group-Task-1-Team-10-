package com.notify.notify;

import android.support.multidex.MultiDexApplication;

import com.facebook.react.ReactPackage;

import java.util.Arrays;
import java.util.List;

// Needed for `react-native link`
// import com.facebook.react.ReactApplication;
import in.sriraman.sharedpreferences.RNSharedPreferencesReactPackage;
import io.invertase.firebase.RNFirebasePackage;
import io.invertase.firebase.messaging.RNFirebaseMessagingPackage;
import com.evollu.react.fcm.FIRMessagingPackage;

public class MainApplication extends MultiDexApplication {

  // Needed for `react-native link`
  public List<ReactPackage> getPackages() {
    return Arrays.<ReactPackage>asList(
        // Add your own packages here!
        // TODO: add cool native modules

        // Needed for `react-native link`
            new MainReactPackage(),
            new RNSharedPreferencesReactPackage(),
            new RNFirebasePackage(),
            new RNFirebaseMessagingPackage(),
            new FIRMessagingPackage()
    );
  }
}
