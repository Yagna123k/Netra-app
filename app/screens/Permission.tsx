import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Linking,
    Platform,
    ScrollView,
    NativeModules,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigation';
import { Colors } from '../constants/Colors';
import { Settings, AlertCircle } from 'lucide-react-native';

type PermissionNavigationProp = StackNavigationProp<
    RootStackParamList,
    'Permission'
>;

interface Props {
    navigation: PermissionNavigationProp;
}

const { PermissionModule } = NativeModules;

const Permission: React.FC<Props> = ({ navigation }) => {
    const [error, setError] = useState(null)

    const requestPermission = async () => {
        PermissionModule.requestModifySettings();
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <ScrollView
                contentContainerStyle={styles.scrollContainer}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.iconContainer}>
                    <Settings size={64} color={Colors.primary} strokeWidth={2} />
                </View>

                <Text style={styles.title}>System Settings Permission</Text>

                <Text style={styles.description}>
                    This app needs permission to modify system settings to adjust display and audio settings based on your preferences.
                </Text>

                <View style={styles.permissionBox}>
                    <AlertCircle size={20} color={Colors.warning} strokeWidth={2} />
                    <Text style={styles.permissionText}>
                        Required: Modify System Settings
                    </Text>
                </View>

                <Text style={styles.instructions}>
                    Granting this permission allows the app to:
                </Text>

                <View style={styles.bulletList}>
                    <Text style={styles.bulletItem}>• Adjust screen brightness</Text>
                    <Text style={styles.bulletItem}>• Modify display settings</Text>
                    <Text style={styles.bulletItem}>• Configure audio levels</Text>
                    <Text style={styles.bulletItem}>• Optimize accessibility features</Text>
                </View>

                {error && (
                    <View style={styles.errorContainer}>
                        <Text style={styles.errorText}>{error}</Text>
                    </View>
                )}

                <TouchableOpacity
                    style={styles.button}
                    onPress={requestPermission}
                    activeOpacity={0.8}
                >
                    <Text style={styles.buttonText}>Grant Permission</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.secondaryButton}
                    onPress={() => navigation.goBack()}
                    activeOpacity={0.8}
                >
                    <Text style={styles.secondaryButtonText}>Go Back</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
};

export default Permission;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9FAFB',
    },
    scrollContainer: {
        paddingHorizontal: 24,
        paddingVertical: 40,
        alignItems: 'center',
    },
    iconContainer: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: '#EEF2FF',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 32,
    },
    title: {
        fontSize: 28,
        fontWeight: '700',
        color: '#111827',
        textAlign: 'center',
        marginBottom: 16,
    },
    description: {
        fontSize: 16,
        color: '#6B7280',
        textAlign: 'center',
        lineHeight: 24,
        marginBottom: 24,
    },
    permissionBox: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFBEB',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#FDE68A',
        marginBottom: 24,
        gap: 8,
    },
    permissionText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#92400E',
    },
    instructions: {
        fontSize: 16,
        fontWeight: '600',
        color: '#374151',
        marginBottom: 12,
        alignSelf: 'flex-start',
    },
    bulletList: {
        alignSelf: 'flex-start',
        marginBottom: 32,
    },
    bulletItem: {
        fontSize: 15,
        color: '#6B7280',
        lineHeight: 28,
    },
    errorContainer: {
        backgroundColor: '#FEE2E2',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#FECACA',
        marginBottom: 16,
        width: '100%',
    },
    errorText: {
        fontSize: 14,
        color: '#991B1B',
        textAlign: 'center',
    },
    button: {
        backgroundColor: '#4F46E5',
        paddingVertical: 16,
        paddingHorizontal: 32,
        borderRadius: 12,
        width: '100%',
        alignItems: 'center',
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#FFFFFF',
    },
    secondaryButton: {
        backgroundColor: 'transparent',
        paddingVertical: 16,
        paddingHorizontal: 32,
        borderRadius: 12,
        width: '100%',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#D1D5DB',
    },
    secondaryButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#6B7280',
    },
});
