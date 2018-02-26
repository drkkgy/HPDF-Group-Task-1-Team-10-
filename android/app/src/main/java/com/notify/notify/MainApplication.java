package com.notify.notify;

import android.support.multidex.MultiDexApplication;

import com.facebook.react.ReactPackage;

import java.util.Arrays;
import java.util.List;
import io.invertase.firebase.RNFirebasePackage;
import io.invertase.firebase.messaging.RNFirebaseMessagingPackage;

// Needed for `react-native link`
import com.facebook.react.ReactApplication;
import in.sriraman.sharedpreferences.RNSharedPreferencesReactPackage;
import io.invertase.firebase.RNFirebasePackage;
import com.evollu.react.fcm.FIRMessagingPackage;

public class MainApplication extends Application implements ReactApplication {

  @Override
  protected List<ReactPackage> getPackages() {
    return Arrays.<ReactPackage>asList(
        new MainReactPackage(),
            new RNSharedPreferencesReactPackage(),
            new RNFirebasePackage(),
            new FIRMessagingPackage(),
        new RNFirebasePackage(),
        new RNFirebaseMessagingPackage() // <-- Add this line
    );
  }
};
}
