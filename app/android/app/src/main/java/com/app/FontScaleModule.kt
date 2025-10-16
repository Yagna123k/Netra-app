package com.app

import android.content.Context
import android.content.Intent
import android.net.Uri  
import android.content.res.Configuration
import android.provider.Settings
import android.util.DisplayMetrics
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.module.annotations.ReactModule

@ReactModule(name = FontScaleModule.NAME)
class FontScaleModule(private val reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    companion object {
        const val NAME = "FontScale"
    }

    override fun getName(): String {
        return NAME
    }

    @ReactMethod
    fun requestWriteSettings() {
        val context: Context = reactContext
        if (!Settings.System.canWrite(context)) {
            val intent = Intent(Settings.ACTION_MANAGE_WRITE_SETTINGS)
            intent.data = Uri.parse("package:${context.packageName}")
            intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
            context.startActivity(intent)
        }
    }

    @ReactMethod
    fun setFontScale(scale: Float, promise: com.facebook.react.bridge.Promise) {
        try {
            val context: Context = reactContext
            if (!Settings.System.canWrite(context)) {
                promise.resolve(false)
                return
            }

            Settings.System.putFloat(context.contentResolver, Settings.System.FONT_SCALE, scale)

            val config: Configuration = context.resources.configuration
            config.fontScale = scale
            val metrics: DisplayMetrics = context.resources.displayMetrics
            context.resources.updateConfiguration(config, metrics)

            promise.resolve(true)
        } catch (e: Exception) {
            e.printStackTrace()
            promise.reject("ERROR", e)
        }
    }
}
