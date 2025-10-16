package com.app

import android.content.Intent
import android.net.Uri
import android.provider.Settings
import com.facebook.react.bridge.*

class PermissionModule(private val reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String = "PermissionModule"

    @ReactMethod
    fun checkModifySettings(promise: Promise) {
        try {
            val granted = Settings.System.canWrite(reactContext)
            promise.resolve(granted)
        } catch (e: Exception) {
            promise.reject("CHECK_PERMISSION_ERROR", e)
        }
    }

    @ReactMethod
    fun requestModifySettings() {
        try {
            val granted = Settings.System.canWrite(reactContext)
            if (!granted) {
                val intent = Intent(Settings.ACTION_MANAGE_WRITE_SETTINGS).apply {
                    data = Uri.parse("package:${reactContext.packageName}")
                    addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
                }
                reactContext.startActivity(intent)
            }
        } catch (e: Exception) {
            e.printStackTrace()
        }
    }
}
